import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import DatePickerField from '../DatePickerField';

describe('DatePickerField Component', () => {
  const mockSetDate = jest.fn();
  const testDate = new Date(2024, 1, 27);

  it('should render correctly with label', () => {
    const { getByText } = render(
      <DatePickerField label="Select Date" date={testDate} setDate={mockSetDate} />
    );
    expect(getByText('Select Date')).toBeTruthy();
  });

  it('should display the formatted date', () => {
    const formattedDate = new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(testDate);

    const { getByText } = render(
      <DatePickerField label="Select Date" date={testDate} setDate={mockSetDate} />
    );
    expect(getByText(formattedDate)).toBeTruthy();
  });

  it('should open DateTimePicker when touched', async () => {
    const { getByTestId, findByTestId } = render(
      <DatePickerField label="Select Date" date={testDate} setDate={mockSetDate} />
    );

    fireEvent.press(getByTestId('open-picker-Select Date'));

    const datePicker = await findByTestId('date-time-picker-Select Date');
    expect(datePicker).toBeTruthy();
  });

  it('should update the date when a new date is selected', async () => {
    const newDate = new Date(2025, 0, 1);

    const { getByTestId, findByTestId } = render(
      <DatePickerField label="Select Date" date={testDate} setDate={mockSetDate} />
    );

    fireEvent.press(getByTestId('open-picker-Select Date'));

    const datePicker = await findByTestId('date-time-picker-Select Date');

    await act(async () => {
      fireEvent(datePicker, 'onChange', {
        nativeEvent: { timestamp: newDate.getTime() },
        type: 'set',
      });
    });

    expect(mockSetDate).toHaveBeenCalledTimes(1);
    expect(mockSetDate).toHaveBeenCalledWith(expect.any(Date));

    const selectedDate = mockSetDate.mock.calls[0][0];
    expect(selectedDate.toISOString().split('T')[0]).toBe('2025-01-01');
  });

  it('should display error messages when provided', () => {
    const { getByText } = render(
      <DatePickerField label="Select Date" date={testDate} setDate={mockSetDate} errors={['Invalid date']} />
    );
    expect(getByText('Invalid date')).toBeTruthy();
  });
});
