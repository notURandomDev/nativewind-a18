import { View, Text, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';

interface ButtonAllinOneProps {
  children?: ReactNode;
  bgColor?: string;
  textColor?: string;
  variant?: 'solid' | 'outline';
  rounded?: 'none' | 'lg';
  label?: string;
  borderColor?: string;
  onPress?: () => void;
}

const ButtonAllinOne = ({
  children,
  bgColor = 'bg-blue',
  variant = 'solid',
  textColor = 'text-black',
  rounded = 'lg',
  label = '',
  borderColor = 'border-blue',
  onPress = () => {
    console.log('button pressed');
  },
}: ButtonAllinOneProps) => {
  const baseStyles = 'text-black py-1.5 px-2 border';

  const variantStyles = {
    solid: `${bgColor} border-${bgColor.replace('bg-', '')} `,
    outline: ` ${borderColor}`,
  };

  const roundedStyles = {
    none: 'rounded-none',
    lg: 'rounded-lg',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${roundedStyles[rounded]}`;

  return (
    <TouchableOpacity className={combinedStyles} onPress={onPress}>
      <Text className={textColor}>{label}</Text>
      {children}
    </TouchableOpacity>
  );
};

export default ButtonAllinOne;
