import AsyncStorage from '@react-native-async-storage/async-storage';
import { TranscriptionProps } from 'app/videos_id/[vid]/digest/transcribe';

type TranscriptionStorageScheme = {
  transcriptionData: TranscriptionProps[] | [];
  lastEventIndex: number;
};

type UpdateTranscriptionDataProps = (
  taskKey: string,
  newTranscriptionData: TranscriptionProps[] | [],
  lastEventId: number
) => void;

const LOG_PREFIX = 'ASYNC-STORAGE:';

export const updateTranscriptionData: UpdateTranscriptionDataProps = async (
  taskKey,
  newTranscriptionData,
  lastEventId
) => {
  const LOG_CONTENT = ' Updating Transcription Data for ' + taskKey;
  try {
    const data: TranscriptionStorageScheme = {
      transcriptionData: newTranscriptionData,
      lastEventIndex: lastEventId,
    };
    await AsyncStorage.setItem(`meeting-${taskKey}`, JSON.stringify(data));
    console.log(LOG_PREFIX + 'Success' + LOG_CONTENT, newTranscriptionData);
  } catch (e) {
    console.error(LOG_PREFIX + 'Error' + LOG_CONTENT, e);
  }
};

type GetTranscriptionDataProps = (taskKey: string) => Promise<TranscriptionStorageScheme>;

export const getTranscriptionData: GetTranscriptionDataProps = async (taskKey: string) => {
  const LOG_CONTENT = ' Getting Transcription Data for ' + taskKey;
  try {
    const res = await AsyncStorage.getItem(`meeting-${taskKey}`).then((data) => {
      if (data === null) {
        updateTranscriptionData(taskKey, [], 0);
        return [];
      }

      return JSON.parse(data);
    });
    console.log(LOG_PREFIX + 'Success' + LOG_CONTENT, res);
    return res;
  } catch (e) {
    console.error(LOG_PREFIX + 'Error' + LOG_CONTENT, e);
    return [];
  }
};

export const deleteTranscriptionData = async (taskKey: string) => {
  const LOG_CONTENT = ' Deleting Transcription Data for ' + taskKey;
  try {
    await AsyncStorage.removeItem(`meeting-${taskKey}`);
    console.log(LOG_PREFIX + 'Success' + LOG_CONTENT);
  } catch (e) {
    console.error(LOG_PREFIX + 'Error' + LOG_CONTENT, e);
  }
};
