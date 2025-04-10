import { useEffect, useMemo, useRef } from 'react';
import EventSource, { EventSourceEvent, EventSourceListener } from 'react-native-sse';

const TEST_BASEURL = 'https://sse.dev/test';

export type MyCustomEvents = 'transcription' | 'meeting-created' | 'chat' | 'complete';

interface ListenerFunctionProps {
  onMessage?: EventSourceListener<MyCustomEvents, 'message'>;
  onOpen?: EventSourceListener<MyCustomEvents, 'open'>;
  onChat?: EventSourceListener<MyCustomEvents, 'chat'>;
  onComplete?: EventSourceListener<MyCustomEvents, 'complete'>;
  onClose?: EventSourceListener<MyCustomEvents, 'close'>;
  onTranscription?: EventSourceListener<MyCustomEvents, 'transcription'>;
  onMeetingCreated?: EventSourceListener<MyCustomEvents, 'meeting-created'>;
}

export const useSSE = (lf: ListenerFunctionProps) => {
  const esRef = useRef<EventSource<MyCustomEvents> | null>(null);
  const { onMessage, onOpen, onChat, onComplete, onClose, onMeetingCreated, onTranscription } = lf;
  const eventListeners = useMemo(
    () => [
      { type: 'message', handler: onMessage },
      { type: 'open', handler: onOpen },
      { type: 'chat', handler: onChat },
      { type: 'complete', handler: onComplete },
      { type: 'close', handler: onClose },
      { type: 'transcription', handler: onTranscription },
      { type: 'meeting-created', handler: onMeetingCreated },
    ],
    [onMessage, onOpen, onChat, onComplete, onClose, onMeetingCreated, onTranscription]
  );

  const bindEventListeners = () => {
    if (esRef.current) {
      eventListeners.forEach(({ type, handler }) => {
        if (handler) esRef.current?.addEventListener(type, handler);
      });
    }
  };

  const unbindEventListeners = () => {
    if (esRef.current) {
      esRef.current.removeAllEventListeners();
    }
  };

  const sendEventSourceDevRequest = (queryObj?: object) => {
    let url = TEST_BASEURL;
    if (queryObj) {
      const queryString = new URLSearchParams({
        jsonobj: JSON.stringify(queryObj),
        interval: '5',
      }).toString();
      url += `?${queryString}`;
    }

    const es = new EventSource(url);
    esRef.current = es;
    bindEventListeners();
  };

  const sendEventSourceGetRequest = (url: string) => {
    const es = new EventSource(url);
    esRef.current = es;
    bindEventListeners();
  };

  const sendEventSourcePostRequest = (req: string, url: string) => {
    const options = {
      method: 'POST',
      body: req,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const es = new EventSource(url, options);
    esRef.current = es;
    bindEventListeners();
  };

  const terminateEventSourceConnection = () => {
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
  };

  useEffect(() => {
    bindEventListeners();
    return unbindEventListeners;
  }, [eventListeners]);

  return {
    sendEventSourceGetRequest,
    sendEventSourcePostRequest,
    sendEventSourceDevRequest,
    terminateEventSourceConnection,
  };
};
