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
  textColor,
  rounded = 'lg',
  borderColor = 'border-blue',
  label,
  containerStyles,
  onPress = () => {
    console.log('button pressed');
  },
}: ButtonAllinOneProps) => {
  const baseStyles = 'py-1.5 px-2 border items-center justify-center';

  const variantStyles = {
    solid: `text-white ${bgColor} border-${bgColor.replace('bg-', '')} `,
    outline: ` ${borderColor}`,
    ghost: 'border-0',
  };

  const roundedStyles = {
    none: 'rounded-none',
    lg: 'rounded-lg',
  };

  const textStyles = {
    solid: 'text-white',
    outline: 'text-blue',
    ghost: 'text-blue', // Add a style for the ghost variant
  };

  const combinedStyles = `${baseStyles} ${roundedStyles[rounded]} ${variantStyles[variant]} ${containerStyles}`;

  return (
    <TouchableOpacity className={combinedStyles} onPress={onPress}>
      {label && <Text className={`${textStyles[variant]} ${textColor}`}>{label}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export default ButtonAllinOne;
