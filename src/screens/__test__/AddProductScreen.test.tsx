
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import AddProductScreen from '../AddProductScreen';
import { productsService } from '../../api/ProductsService';
import { validateNewProduct } from '../../utils/Validations';
import { ERROR_MESSAGES } from '../../constants/errorMessages';

jest.mock('../../api/ProductsService');
jest.mock('../../utils/Validations');

jest.mock('../../components/molecules/FormProduct', () => {
  const { Text } = require('react-native');
  return (props: any) => {
    return <Text testID="form-product">{JSON.stringify(props)}</Text>;
  };
});

describe('AddProductScreen', () => {
  const mockNavigation = { goBack: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render FormProduct and ActionButtons', () => {
    const { getByTestId, getByText } = render(
      <AddProductScreen navigation={mockNavigation} />
    );
    expect(getByTestId('form-product')).toBeTruthy();
    expect(getByText('Enviar')).toBeTruthy();
    expect(getByText('Reiniciar')).toBeTruthy();
  });

  it('should set errors if validation fails', async () => {
    (validateNewProduct as jest.Mock).mockReturnValue({ id: 'Invalid id' });
    (productsService.verifyId as jest.Mock).mockResolvedValueOnce(false);

    const { getByText, getByTestId } = render(
      <AddProductScreen navigation={mockNavigation} />
    );

    await act(async () => {
      fireEvent.press(getByText('Enviar'));
    });

    const formProps = JSON.parse(getByTestId('form-product').props.children);
    expect(formProps.errors).toEqual({ id: 'Invalid id' });
  });

  it('should call create and goBack when validation passes and creation is successful', async () => {
    (validateNewProduct as jest.Mock).mockReturnValue({});
    (productsService.verifyId as jest.Mock).mockResolvedValueOnce(false);
    (productsService.create as jest.Mock).mockResolvedValueOnce({
      id: '123',
      name: 'Test Product',
      description: 'Desc',
      logo: '',
      date_release: new Date(),
      date_revision: new Date(),
    });

    const { getByText } = render(
      <AddProductScreen navigation={mockNavigation} />
    );

    await act(async () => {
      fireEvent.press(getByText('Enviar'));
    });

    expect(productsService.create).toHaveBeenCalled();
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('should set general error if creation fails', async () => {
    (validateNewProduct as jest.Mock).mockReturnValue({});
    (productsService.verifyId as jest.Mock).mockResolvedValueOnce(false);
    (productsService.create as jest.Mock).mockRejectedValueOnce(new Error('Fail'));

    const { getByText, getByTestId } = render(
      <AddProductScreen navigation={mockNavigation} />
    );

    await act(async () => {
      fireEvent.press(getByText('Enviar'));
    });

    const formProps = JSON.parse(getByTestId('form-product').props.children);
    expect(formProps.errors).toEqual({ general: ERROR_MESSAGES.CREATE_PRODUCT });
  });

  it('should reset form fields when pressing "Reiniciar"', async () => {
    const { getByText, getByTestId } = render(
      <AddProductScreen navigation={mockNavigation} />
    );

    await act(async () => {
      fireEvent.press(getByText('Reiniciar'));
    });

    const formProps = JSON.parse(getByTestId('form-product').props.children);
    expect(formProps.id).toEqual('');
    expect(formProps.name).toEqual('');
    expect(formProps.description).toEqual('');
    expect(formProps.logo).toEqual('');
    expect(formProps.errors).toEqual({});
    expect(formProps.dateRelease).toBeTruthy();
    expect(formProps.dateRevision).toBeTruthy();
  });
});
