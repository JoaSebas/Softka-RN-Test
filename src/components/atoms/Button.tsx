import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';

interface Props {
  text: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'danger';
}

export default function Button({text, onPress, type = 'primary'}: Props) {
  return (
    <TouchableOpacity
      testID={`button-${type}`}
      style={
        type === 'primary'
          ? globalStyles.buttonPrimary
          : type === 'secondary'
          ? globalStyles.buttonSecondary
          : globalStyles.buttonDanger
      }
      onPress={onPress}>
      <Text
        style={
          type === 'danger'
            ? globalStyles.buttonTextDanger
            : globalStyles.buttonText
        }>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
