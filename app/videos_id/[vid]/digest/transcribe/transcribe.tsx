import { View, Text, ScrollView, Alert, FlatList } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TintedBackground from 'components/TintedBackground';
import ButtonAllinOne from 'components/ButtonAllinOne';
import BottomIndicator from 'components/BottomIndicator';
import EventSource, { EventSourceEvent } from 'react-native-sse';

import TRANSCRIPTION_DATA from '../../../../../test/enhance_output_cards.json';
import { MyCustomEvents } from 'hooks/useSSE';
import { useSSE } from 'hooks/useSSE';
import {
  deleteTranscriptionData,
  getTranscriptionData,
  updateTranscriptionData,
} from 'storage/transcriptionStorage';
import { TRANSCRIPTION_WITH_CARD_FULL_DATA } from 'data/enhance_output_cards';
import { DEFAULT_TASKKEY, URL_REAL_BACKEND } from './constants';
import { TranscriptionProps } from './types';
import { ModifyNoteTagCbProps } from './components/HighlightableParagraph/types';
import HighlightableParagraph from './components/HighlightableParagraph/HighlightableParagraph';
TRANSCRIPTION_DATA.sort((a, b) => a.sentenceId - b.sentenceId);

const RealtimeTranscribe = () => {
  /* States */
  const [transcription, setTranscription] = useState<TranscriptionProps[] | []>([]);
  // const [transcription, setTranscription] = useState('');
  const [currentTranscription, setCurrentTranscription] = useState<TranscriptionProps | null>();
  const [loading, setLoading] = useState(false);

  /* Refs */
  const taskKeyRef = useRef<string>(DEFAULT_TASKKEY);
  const lastEventIdRef = useRef<number>(0);
  const scrollviewRef = useRef<ScrollView>(null);

  /* SSE Event Listeners */
  const onMeetingCreated = (event: EventSourceEvent<MyCustomEvents>) => {
    if (event.data) {
      const res = JSON.parse(event.data);
      console.log('taskKey', res);
      taskKeyRef.current = res.taskKey;
    }
  };

  const onTranscription = (event: EventSourceEvent<MyCustomEvents>) => {
    if (event.data) {
      const newTranscription: TranscriptionProps = JSON.parse(event.data);
      console.log('newTranscription received', newTranscription);

      if (newTranscription.type === 'enhanced') {
        const eventId = newTranscription.data.index;
        setTranscription((prev) =>
          prev.map((item, index) => (index === eventId ? newTranscription : item))
        );
        lastEventIdRef.current = eventId;
      } else if (newTranscription.type === 'missedEnhanced') {
        setTranscription((prev) => [...prev, newTranscription]);
      } else if (newTranscription.type === 'raw') {
        if (newTranscription._final) {
          if (transcription.length) {
            setTranscription((prev) => [...prev, newTranscription]);
          } else {
            setTranscription([newTranscription]);
          }
          setCurrentTranscription(null);
        } else {
          if (currentTranscription) {
            setCurrentTranscription((prev) => {
              if (prev) {
                const {
                  data: { text, ...dataRest },
                  ...rest
                } = prev;
                return { ...rest, data: { text: newTranscription.data.text, ...dataRest } };
              }
              return prev; // Ensure a valid return value
            });
          } else {
            setCurrentTranscription(newTranscription);
          }
        }
      }
    }
  };

  const onClose = () => {
    updateTranscriptionDataAsync();
    console.log('on es close');
  };

  const { terminateEventSourceConnection, sendEventSourceGetRequest, sendEventSourceDevRequest } =
    useSSE({
      onOpen: () => console.log(`es-opened-${Date.now()}`),
      onTranscription,
      onMessage: onTranscription,
      onComplete: onClose,
      onClose: onClose,
      onMeetingCreated,
    });

  const handleNoteTagModify = useCallback<ModifyNoteTagCbProps>((index, newNoteTag) => {
    setTranscription((prev) => {
      const newData = prev.map((item) => {
        if (item.data.index === index) {
          return {
            ...item,
            noteTag: newNoteTag,
          };
        }
        return item;
      });
      updateTranscriptionDataAsync();
      return newData;
    });
  }, []);

  const MemoizedParagraphs = useMemo(
    () =>
      transcription.map((item) => (
        <HighlightableParagraph
          modifyNoteTagCb={handleNoteTagModify}
          noteTag={item.noteTag}
          type={item.type}
          key={`paragraph-${item.timestamp}`}
          sentence={item.data}
        />
      )),
    [transcription]
  );

  const startES = () => {
    setLoading(true);
    // sendEventSourceDevRequest(SSE_RES_4_TESTING_WITH_CARDS);
    console.log(`lastEventIdRef:`, lastEventIdRef.current);
    console.log(`taskKeyRef:`, taskKeyRef.current);
    sendEventSourceGetRequest(
      `${URL_REAL_BACKEND}?lastEventId=${lastEventIdRef.current}&taskKey=${taskKeyRef.current}`
    );
  };

  const endES = () => {
    console.log(`es-terminated-${Date.now()}`);
    terminateEventSourceConnection();
  };

  /* useEffects */

  useEffect(() => {
    startES();
    setTimeout(() => {
      // setTranscription([SSE_RES_4_TESTING_WITH_CARDS]);
      setTranscription(TRANSCRIPTION_WITH_CARD_FULL_DATA.slice(0, 43));
    }, 100);
    return () => {
      endES();
    };
  }, []);

  useEffect(() => {
    console.log('currentTranscription:', currentTranscription);
  }, [currentTranscription]);

  /* useEffect(() => {
    getTranscriptionDataAsync();
  }, [taskKeyRef.current]); */

  /* Async Storage Operations */

  const getTranscriptionDataAsync = async () => {
    const { transcriptionData = [], lastEventIndex = 0 } = await getTranscriptionData(
      taskKeyRef.current
    );
    setTranscription(transcriptionData);
    lastEventIdRef.current = lastEventIndex;
  };

  const updateTranscriptionDataAsync = () => {
    updateTranscriptionData(taskKeyRef.current, transcription, lastEventIdRef.current);
  };

  const deleteTranscriptionDataAsync = async () => {
    Alert.alert(taskKeyRef.current, `你确定要删除转录数据吗？`, [
      { text: '取消', style: 'cancel' },
      {
        text: '删除',
        style: 'destructive',
        onPress: async () => {
          await deleteTranscriptionData(taskKeyRef.current);
          setTranscription([]);
        },
      },
    ]);
  };

  return (
    <ScrollView
      onContentSizeChange={() => {
        scrollviewRef.current?.scrollToEnd({ animated: true });
      }}
      ref={scrollviewRef}
      contentContainerStyle={{
        display: 'flex',
        flexGrow: 1,
        gap: 12,
        backgroundColor: '#ffffff',
        paddingHorizontal: 28,
        // paddingBottom: 285,
      }}>
      <View className="relative gap-4">
        <TintedBackground label="实时转写">
          {/*    <View className="flex-row justify-between">
            <ButtonAllinOne disabled={loading} onPress={startES}>
              <Text className="text-white">开始测试</Text>
            </ButtonAllinOne>
            <ButtonAllinOne variant="ghost" onPress={deleteTranscriptionDataAsync}>
              <Text style={{ color: '#F66348' }}>删除转录数据</Text>
            </ButtonAllinOne>
            <ButtonAllinOne onPress={endES} variant="outline" label="结束测试" />
          </View> */}
          {/* <Text className="text-lg font-medium">{`taskKey: ${taskKeyRef.current}`}</Text> */}
          <View className="flex-1 gap-3">
            {MemoizedParagraphs}
            {currentTranscription && (
              <View className="bg-blue-faint">
                <HighlightableParagraph
                  modifyNoteTagCb={handleNoteTagModify}
                  noteTag="none"
                  type={currentTranscription.type}
                  key={`temp-paragraph-${currentTranscription.timestamp}`}
                  sentence={currentTranscription.data}
                />
              </View>
            )}
          </View>
        </TintedBackground>
      </View>

      <BottomIndicator />
    </ScrollView>
  );
};

export default RealtimeTranscribe;
