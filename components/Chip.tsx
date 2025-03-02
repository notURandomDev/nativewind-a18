import { View, Text } from 'react-native';
import React from 'react';

interface ChipProps {
  children: string;
  variant?: 'flat' | 'bordered' | 'filled';
  color?: 'blue' | 'black';
  textColor?: 'blue' | 'black';
  className?: string;
}

const Chip = ({
  children,
  variant = 'flat',
  color = 'blue',
  textColor = 'black',
  className = '',
}: ChipProps) => {
  const baseStyles = 'rounded-xl rounded-2xl px-2.5 py-1.5';

  const colorStyles = {
    blue: 'text-blue bg-blue',
    black: 'text-black bg-black',
  };

  const variantStyles = {
    flat: '',
    bordered: 'border',
    filled: '',
  };

  const combinedStyles = [baseStyles, variantStyles[variant], colorStyles[color], className]
    .join(' ')
    .trim();

  return (
    <View className={`${combinedStyles}`}>
      <Text className="text-blue">{children}</Text>
    </View>
  );
};

export default Chip;
