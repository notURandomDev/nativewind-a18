import AsyncStorage from '@react-native-async-storage/async-storage';
import { TranscriptionProps } from 'app/videos_id/[vid]/digest/transcribe';

type UpdateTranscriptionDataProps = (
  taskKey: string,
  newTranscriptionData: TranscriptionProps[] | []
) => void;

const LOG_PREFIX = 'ASYNC-STORAGE:';

export const updateTranscriptionData: UpdateTranscriptionDataProps = async (
  taskKey,
  newTranscriptionData
) => {
  const LOG_CONTENT = ' Updating Transcription Data for ' + taskKey;
  try {
    await AsyncStorage.setItem(`meeting-${taskKey}`, JSON.stringify(newTranscriptionData));
    console.log(LOG_PREFIX + 'Success' + LOG_CONTENT, newTranscriptionData);
  } catch (e) {
    console.error(LOG_PREFIX + 'Error' + LOG_CONTENT, e);
  }
};

type GetTranscriptionDataProps = (taskKey: string) => Promise<TranscriptionProps[] | []>;

export const getTranscriptionData: GetTranscriptionDataProps = async (taskKey: string) => {
  const LOG_CONTENT = ' Getting Transcription Data for ' + taskKey;
  try {
    const res = await AsyncStorage.getItem(`meeting-${taskKey}`).then((data) => {
      if (data === null) {
        updateTranscriptionData(taskKey, []);
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
