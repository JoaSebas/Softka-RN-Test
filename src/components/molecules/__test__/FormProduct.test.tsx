import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import FormProduct from '../FormProduct';

describe('FormProduct Component', () => {
  const mockSetId = jest.fn();
  const mockSetName = jest.fn();
  const mockSetDescription = jest.fn();
  const mockSetLogo = jest.fn();
  const mockSetDateRelease = jest.fn();
  const mockSetDateRevision = jest.fn();

  const defaultProps = {
    id: '123',
    setId: mockSetId,
    name: 'Product Name',
    setName: mockSetName,
    description: 'Product Description',
    setDescription: mockSetDescription,
    logo: 'logo.png',
    setLogo: mockSetLogo,
    dateRelease: new Date('2024-12-28'),
    setDateRelease: mockSetDateRelease,
    dateRevision: new Date('2025-12-28'),
    setDateRevision: mockSetDateRevision,
    errors: {},
    editable: true,
  };

  it('should render all input fields', () => {
    const {getByTestId} = render(<FormProduct {...defaultProps} />);

    expect(getByTestId('input-field-id')).toBeTruthy();
    expect(getByTestId('input-field-nombre')).toBeTruthy();
    expect(getByTestId('input-field-descripción')).toBeTruthy();
    expect(getByTestId('input-field-logo')).toBeTruthy();
  });

  it('should trigger setId when ID input changes', () => {
    const {getByTestId} = render(<FormProduct {...defaultProps} />);

    fireEvent.changeText(getByTestId('input-field-id'), '456');
    expect(mockSetId).toHaveBeenCalledWith('456');
  });

  it('should trigger setName when Name input changes', () => {
    const {getByTestId} = render(<FormProduct {...defaultProps} />);

    fireEvent.changeText(getByTestId('input-field-nombre'), 'New Product Name');
    expect(mockSetName).toHaveBeenCalledWith('New Product Name');
  });

  it('should trigger setDescription when Description input changes', () => {
    const {getByTestId} = render(<FormProduct {...defaultProps} />);

    fireEvent.changeText(
      getByTestId('input-field-descripción'),
      'Updated description',
    );
    expect(mockSetDescription).toHaveBeenCalledWith('Updated description');
  });

  it('should trigger setLogo when Logo input changes', () => {
    const {getByTestId} = render(<FormProduct {...defaultProps} />);

    fireEvent.changeText(getByTestId('input-field-logo'), 'new-logo.png');
    expect(mockSetLogo).toHaveBeenCalledWith('new-logo.png');
  });

  it('should update release date when a new date is selected', async () => {
    const newDate = new Date('2025-06-01');

    const {getByTestId, findByTestId} = render(
      <FormProduct {...defaultProps} />,
    );

    fireEvent.press(getByTestId('open-picker-Fecha Liberación'));

    const datePicker = await findByTestId('date-time-picker-Fecha Liberación');

    await act(async () => {
      fireEvent(datePicker, 'onChange', {
        nativeEvent: {timestamp: newDate.getTime()},
        type: 'set',
      });
    });

    expect(mockSetDateRelease).toHaveBeenCalledTimes(1);
    expect(mockSetDateRelease).toHaveBeenCalledWith(expect.any(Date));

    const selectedDate = mockSetDateRelease.mock.calls[0][0];
    expect(selectedDate.toISOString().split('T')[0]).toBe('2025-06-01');
  });

  it('should update revision date when a new date is selected', async () => {
    const newDate = new Date('2026-06-01');

    const {getByTestId, findByTestId} = render(
      <FormProduct {...defaultProps} />,
    );

    fireEvent.press(getByTestId('open-picker-Fecha Revisión'));

    const datePicker = await findByTestId('date-time-picker-Fecha Revisión');

    await act(async () => {
      fireEvent(datePicker, 'onChange', {
        nativeEvent: {timestamp: newDate.getTime()},
        type: 'set',
      });
    });

    expect(mockSetDateRevision).toHaveBeenCalledTimes(1);
    expect(mockSetDateRevision).toHaveBeenCalledWith(expect.any(Date));

    const selectedDate = mockSetDateRevision.mock.calls[0][0];
    expect(selectedDate.toISOString().split('T')[0]).toBe('2026-06-01');
  });

  it('should disable the ID field when editable is false', () => {
    const {getByTestId} = render(
      <FormProduct {...defaultProps} editable={false} />,
    );
    expect(getByTestId('input-field-id').props.editable).toBe(false);
  });

  it('should display error messages when provided', () => {
    const errorProps = {
      ...defaultProps,
      errors: {
        id: 'ID is required',
        name: 'Name is required',
        description: 'Description too short',
        logo: 'Logo is required',
        dateRelease: 'Invalid release date',
        dateRevision: 'Invalid revision date',
      },
    };

    const {getByText} = render(<FormProduct {...errorProps} />);

    expect(getByText('ID is required')).toBeTruthy();
    expect(getByText('Name is required')).toBeTruthy();
    expect(getByText('Description too short')).toBeTruthy();
    expect(getByText('Logo is required')).toBeTruthy();
    expect(getByText('Invalid release date')).toBeTruthy();
    expect(getByText('Invalid revision date')).toBeTruthy();
  });
});
