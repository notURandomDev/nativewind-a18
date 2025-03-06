import { View, Text, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';

interface ButtonAllinOneProps {
  children?: ReactNode;
  bgColor?: string;
  textColor?: string;
  variant?: 'solid' | 'outline' | 'ghost';
  rounded?: 'none' | 'lg';
  label?: string;
  borderColor?: string;
  containerStyles?: string;
  onPress?: () => void;
}

const ButtonAllinOne = ({
  children,
  bgColor = 'bg-blue',
  variant = 'solid',
  textColor = 'text-black',
  rounded = 'lg',
  borderColor = 'border-blue',
  label,
  containerStyles,
  onPress = () => {
    console.log('button pressed');
  },
}: ButtonAllinOneProps) => {
  const baseStyles = 'text-black py-1.5 px-2 border items-center justify-center';

  const variantStyles = {
    solid: `${bgColor} border-${bgColor.replace('bg-', '')} `,
    outline: ` ${borderColor}`,
    ghost: 'border-0',
  };

  const roundedStyles = {
    none: 'rounded-none',
    lg: 'rounded-lg',
  };

  const combinedStyles = `${baseStyles} ${roundedStyles[rounded]} ${variantStyles[variant]} ${containerStyles}`;

  return (
    <TouchableOpacity className={combinedStyles} onPress={onPress}>
      {label && <Text className={textColor}>{label}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export default ButtonAllinOne;
