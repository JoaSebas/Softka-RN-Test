import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActionButtons from '../ActionButtons';
import { globalStyles } from '../../../styles/globalStyles';

describe('ActionButtons Component', () => {
  it('should render primary and secondary buttons with correct text', () => {
    const { getByText } = render(
      <ActionButtons
        primaryText="Confirm"
        onPrimaryPress={() => {}}
        primaryType="primary"
        secondaryText="Cancel"
        onSecondaryPress={() => {}}
        secondaryType="secondary"
      />
    );

    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('should apply correct styles for primary and secondary buttons', () => {
    const { getByTestId } = render(
      <ActionButtons
        primaryText="Delete"
        onPrimaryPress={() => {}}
        primaryType="danger"
        secondaryText="Go Back"
        onSecondaryPress={() => {}}
        secondaryType="secondary"
      />
    );

    const deleteButton = getByTestId('button-danger').props.style;
    const goBackButton = getByTestId('button-secondary').props.style;

    expect(deleteButton).toMatchObject(globalStyles.buttonDanger);
    expect(goBackButton).toMatchObject(globalStyles.buttonSecondary);
  });

  it('should trigger correct function when buttons are pressed', () => {
    const mockPrimaryPress = jest.fn();
    const mockSecondaryPress = jest.fn();

    const { getByText } = render(
      <ActionButtons
        primaryText="Save"
        onPrimaryPress={mockPrimaryPress}
        secondaryText="Discard"
        onSecondaryPress={mockSecondaryPress}
      />
    );

    fireEvent.press(getByText('Save'));
    fireEvent.press(getByText('Discard'));

    expect(mockPrimaryPress).toHaveBeenCalledTimes(1);
    expect(mockSecondaryPress).toHaveBeenCalledTimes(1);
  });
});
