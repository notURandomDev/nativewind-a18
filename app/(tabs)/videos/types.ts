import { ImageSourcePropType } from 'react-native';

export interface ReplayCardProps {
  title: string;
  datetime: string;
  venue: string;
  tag: string;
  views: number;
  imgsrc: ImageSourcePropType;
}

export interface TrailerProps {
  title: string;
  datetime: string;
  venue: string;
  imgsrc: ImageSourcePropType;
}
