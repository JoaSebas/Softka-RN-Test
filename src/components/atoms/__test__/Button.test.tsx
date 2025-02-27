import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';
import { globalStyles } from '../../../styles/globalStyles';

describe('Button Component', () => {
  it('should render correctly with default props', () => {
    const { getByTestId, getByText } = render(
      <Button text="Click me" onPress={() => {}} />,
    );
    expect(getByTestId('button-primary')).toBeTruthy();
    expect(getByText('Click me')).toBeTruthy();
  });

  it('should trigger onPress when clicked', () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(
      <Button text="Click me" onPress={mockPress} />,
    );

    fireEvent.press(getByTestId('button-primary'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('should apply correct styles for primary type', () => {
    const { getByTestId } = render(
      <Button text="Click me" onPress={() => {}} type="primary" />,
    );
    expect(getByTestId('button-primary').props.style).toMatchObject(
      globalStyles.buttonPrimary,
    );
  });

  it('should apply correct styles for secondary type', () => {
    const { getByTestId } = render(
      <Button text="Click me" onPress={() => {}} type="secondary" />,
    );
    expect(getByTestId('button-secondary').props.style).toMatchObject(
      globalStyles.buttonSecondary,
    );
  });

  it('should apply correct styles for danger type', () => {
    const { getByTestId, getByText } = render(
      <Button text="Delete" onPress={() => {}} type="danger" />,
    );
    expect(getByTestId('button-danger').props.style).toMatchObject(
      globalStyles.buttonDanger,
    );
    expect(getByText('Delete').props.style).toMatchObject(
      globalStyles.buttonTextDanger,
    );
  });
});
