import { LinearGradient } from 'expo-linear-gradient';

export const LinearGradient4Page = () => (
  <LinearGradient
    colors={['rgba(21, 86, 240, 0.25)', 'rgba(255, 255, 255, 0)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 256,
    }}
  />
);
