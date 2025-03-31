import { useRef } from 'react';
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
}

export const useSSE = (lf: ListenerFunctionProps) => {
  const esRef = useRef<EventSource<MyCustomEvents> | null>(null);

  const initEventSource = () => {
    if (esRef.current) {
      lf.onMessage && esRef.current.addEventListener('message', lf.onMessage);
      lf.onOpen && esRef.current.addEventListener('open', lf.onOpen);
      lf.onChat && esRef.current.addEventListener('chat', lf.onChat);
      lf.onComplete && esRef.current.addEventListener('complete', lf.onComplete);
      lf.onClose && esRef.current.addEventListener('close', lf.onClose);
      lf.onTranscription && esRef.current.addEventListener('transcription', lf.onTranscription);
    }
  };

  const sendEventSourceDevRequest = (queryObj?: object) => {
    let url = TEST_BASEURL;
    if (queryObj) {
      const queryString = new URLSearchParams({
        jsonobj: JSON.stringify(queryObj),
      }).toString();
      url += `?${queryString}`;
    }

    const es = new EventSource(url);
    esRef.current = es;
    initEventSource();
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
    initEventSource();
  };

  const terminateEventSourceConnection = () => {
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
  };

  return { sendEventSourcePostRequest, sendEventSourceDevRequest, terminateEventSourceConnection };
};
