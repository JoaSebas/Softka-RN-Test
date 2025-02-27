import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('../navigation/AppNavigator', () => {
  const { Text } = require('react-native');
  return () => <Text>AppNavigatorMock</Text>;
});

describe('App Component', () => {
  it('Renderiza correctamente el AppNavigator', () => {
    const { getByText } = render(<App />);
    expect(getByText('AppNavigatorMock')).toBeTruthy();
  });
});
