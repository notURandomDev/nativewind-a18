import { ImageSourcePropType } from 'react-native';

export interface MsgProps {
  id?: number;
  avatar?: ImageSourcePropType;
  username: string;
  msg: string;
  isSelf: boolean;
}
