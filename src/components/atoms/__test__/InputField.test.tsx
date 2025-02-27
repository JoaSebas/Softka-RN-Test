import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputField from '../InputField';

describe('InputField Component', () => {
  it('should render the label when provided', () => {
    const { getByText } = render(
      <InputField label="Username" value="" onChangeText={() => {}} />
    );
    expect(getByText('Username')).toBeTruthy();
  });

  it('should render an input field with the correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <InputField placeholder="Enter your name" value="" onChangeText={() => {}} />
    );
    expect(getByPlaceholderText('Enter your name')).toBeTruthy();
  });

  it('should call onChangeText when input changes', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <InputField placeholder="Type here" value="" onChangeText={mockOnChangeText} />
    );

    fireEvent.changeText(getByPlaceholderText('Type here'), 'New Value');
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
    expect(mockOnChangeText).toHaveBeenCalledWith('New Value');
  });

  it('should render error messages when provided', () => {
    const { getByText } = render(
      <InputField value="" onChangeText={() => {}} errors={['Required field']} />
    );
    expect(getByText('Required field')).toBeTruthy();
  });

  it('should apply disabled style when editable is false', () => {
    const { getByTestId } = render(
      <InputField label="Test" value="Disabled" onChangeText={() => {}} editable={false} />
    );

    expect(getByTestId('input-field-test').props.editable).toBe(false);
  });
});
