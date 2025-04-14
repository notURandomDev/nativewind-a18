import { ColorValue, TextStyle } from 'react-native';
import { NoteTags } from '../../types';

const SHADOW_OPACITY = 0.01;

export const ParagraphHighlightConfig: {
  [key in NoteTags]: {
    borderColor: ColorValue;
    backgroundColor: ColorValue;
    boxShadow: string;
    textStyles: TextStyle;
  };
} = {
  none: {
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    boxShadow: `0 4px 12px rgba(0,0,0,${SHADOW_OPACITY})`,
    textStyles: {
      textDecorationLine: 'none',
    },
  },
  mark: {
    borderColor: '#F66348',
    backgroundColor: 'rgba(246,99,72,0.1)',
    boxShadow: `0 4px 12px rgba(246,99,72,${SHADOW_OPACITY})`,
    textStyles: {
      textDecorationStyle: 'double',
      textDecorationLine: 'underline',
      textDecorationColor: '#F66348',
    },
  },
  todo: {
    borderColor: '#FFD84E',
    backgroundColor: 'rgba(255,216,78,0.1)',
    boxShadow: `0 4px 12px rgba(255,216,78,${SHADOW_OPACITY})`,
    textStyles: {
      textDecorationStyle: 'solid',
      textDecorationLine: 'underline',
      textDecorationColor: '#FFD84E',
    },
  },
  question: {
    borderColor: '#00BBFF',
    backgroundColor: 'rgba(0,187,255,0.1)',
    boxShadow: `0 4px 12px rgba(0,187,255,${SHADOW_OPACITY})`,
    textStyles: {
      textDecorationStyle: 'dotted',
      textDecorationLine: 'underline',
      textDecorationColor: '#00BBFF',
    },
  },
};

export const NoteTagConfigs = {
  none: { label: '', color: '#ffffff' },
  mark: { label: '重点', color: '#F66348' },
  todo: { label: '代办', color: '#FFD84E' },
  question: { label: '疑惑', color: '#00BBFF' },
};
