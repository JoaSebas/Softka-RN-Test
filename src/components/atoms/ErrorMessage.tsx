import React from 'react';
import {Text} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';

const ErrorMessage = ({errors}: {errors?: string[]}) => {
  if (!errors || errors.length === 0) {return null;}
  return errors.map((err, i) => (
    <Text key={i} style={globalStyles.error}>
      {err}
    </Text>
  ));
};

export default ErrorMessage;
