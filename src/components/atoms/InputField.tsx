import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import ErrorMessage from './ErrorMessage';

interface Props {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  errors?: string[];
  placeholder?: string;
  editable?: boolean;
}

export default function InputField({ label, value, onChangeText, errors = [], placeholder, editable = true }: Props) {
  return (
    <View>
      {label && <Text style={globalStyles.inputText}>{label}</Text>}
      <TextInput
        testID={`input-field-${label?.toLowerCase().replace(/\s+/g, '-') || 'undefined'}`}
        style={[globalStyles.input, errors.length > 0 && globalStyles.inputError, !editable ? globalStyles.inputDisabled : {}]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
      />
      {errors.length > 0 && <ErrorMessage errors={errors} />}
    </View>
  );
}
