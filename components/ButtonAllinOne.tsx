import { View, Text, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';
import * as Haptics from 'expo-haptics';

interface ButtonAllinOneProps {
  children?: ReactNode;
  bgColor?: string;
  textColor?: string;
  variant?: 'solid' | 'outline' | 'ghost';
  rounded?: 'none' | 'xl' | 'full';
  label?: string;
  borderColor?: string;
  containerStyles?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const ButtonAllinOne = ({
  children,
  bgColor = 'bg-blue',
  variant = 'solid',
  textColor,
  rounded = 'xl',
  borderColor = 'border-blue',
  label,
  containerStyles,
  disabled = false,
  onPress = () => {
    console.log('button pressed');
  },
}: ButtonAllinOneProps) => {
  const baseStyles = 'py-2 px-2 border items-center justify-center';

  const variantStyles = {
    solid: `text-white ${bgColor} border-${bgColor.replace('bg-', '')} `,
    outline: ` ${borderColor}`,
    ghost: 'border-0',
  };

  const roundedStyles = {
    none: 'rounded-none',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const textStyles = {
    solid: 'text-white',
    outline: 'text-blue',
    ghost: 'text-blue', // Add a style for the ghost variant
  };

  const combinedStyles = `${baseStyles} ${roundedStyles[rounded]} ${variantStyles[variant]} ${containerStyles}`;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      className={combinedStyles}
      onPress={disabled ? () => {} : handlePress}>
      {label && <Text className={`${textStyles[variant]} ${textColor}`}>{label}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export default ButtonAllinOne;
