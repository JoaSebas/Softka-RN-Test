import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import EditProductScreen from '../EditProductScreen';
import { productsService } from '../../api/ProductsService';
import { validateExistingProduct } from '../../utils/Validations';
import { ERROR_MESSAGES } from '../../constants/errorMessages';

jest.mock('../../api/ProductsService');
jest.mock('../../utils/Validations');

jest.mock('../../components/molecules/FormProduct', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return (props: any) => <Text testID="form-product">{JSON.stringify(props)}</Text>;
});

describe('EditProductScreen', () => {
  const mockNavigation = { goBack: jest.fn(), navigate: jest.fn() };
  const mockRoute = { params: { id: '123' } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading state initially', () => {
    // Simulamos que getOne nunca se resuelve para probar el loading.
    (productsService.getOne as jest.Mock).mockReturnValue(new Promise(() => {}));
    const { getByText } = render(
      <EditProductScreen route={mockRoute} navigation={mockNavigation} />
    );
    expect(getByText('Cargando...')).toBeTruthy();
  });

  it('should display error message if product not found', async () => {
    (productsService.getOne as jest.Mock).mockResolvedValueOnce(null);
    const { getByText } = render(
      <EditProductScreen route={mockRoute} navigation={mockNavigation} />
    );
    await waitFor(() => {
      expect(getByText(ERROR_MESSAGES.GET_PRODUCT)).toBeTruthy();
    });
  });

  it('should render FormProduct and ActionButtons when product is loaded', async () => {
    const product = {
      id: '123',
      name: 'Product 123',
      description: 'A product',
      logo: 'http://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01'),
    };
    (productsService.getOne as jest.Mock).mockResolvedValueOnce(product);
    const {getByText, queryByText } = render(
      <EditProductScreen route={mockRoute} navigation={mockNavigation} />
    );
    await waitFor(() => {
      expect(queryByText('Cargando...')).toBeNull();
      expect(getByText(/Product 123/)).toBeTruthy();
      expect(getByText('Actualizar')).toBeTruthy();
      expect(getByText('Cancelar')).toBeTruthy();
    });
  });

  it('should set errors if validation fails on update', async () => {
    const product = {
      id: '123',
      name: 'Product 123',
      description: 'A product',
      logo: 'http://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01'),
    };
    (productsService.getOne as jest.Mock).mockResolvedValueOnce(product);
    (validateExistingProduct as jest.Mock).mockReturnValue({ name: 'Invalid name' });

    const { getByText, getByTestId } = render(
      <EditProductScreen route={mockRoute} navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText(/Product 123/)).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(getByText('Actualizar'));
    });

    const formProps = JSON.parse(getByTestId('form-product').props.children);
    expect(formProps.errors).toEqual({ name: 'Invalid name' });
    expect(productsService.update).not.toHaveBeenCalled();
  });

  it('should call update and goBack when update is successful', async () => {
    const product = {
      id: '123',
      name: 'Product 123',
      description: 'A product',
      logo: 'http://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01'),
    };
    (productsService.getOne as jest.Mock).mockResolvedValueOnce(product);
    (validateExistingProduct as jest.Mock).mockReturnValue({});
    (productsService.update as jest.Mock).mockResolvedValueOnce({});

    const { getByText } = render(
      <EditProductScreen route={mockRoute} navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText(/Product 123/)).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(getByText('Actualizar'));
    });

    expect(productsService.update).toHaveBeenCalledWith(product.id, product);
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('should call navigation.goBack when pressing "Cancelar"', async () => {
    const product = {
      id: '123',
      name: 'Product 123',
      description: 'A product',
      logo: 'http://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01'),
    };
    (productsService.getOne as jest.Mock).mockResolvedValueOnce(product);
    const { getByText } = render(
      <EditProductScreen route={mockRoute} navigation={mockNavigation} />
    );
    await waitFor(() => {
      expect(getByText(/Product 123/)).toBeTruthy();
    });
    fireEvent.press(getByText('Cancelar'));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
