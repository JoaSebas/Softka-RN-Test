// ProductDetailScreen.test.tsx
import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import ProductDetailScreen from '../ProductDetailScreen';
import {productsService} from '../../api/ProductsService';

jest.mock('../../api/ProductsService');

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn(),
    }),
    useFocusEffect: (callback: () => void) => {
      callback();
    },
  };
});

describe('ProductDetailScreen', () => {
  const mockNavigation: any = {navigate: jest.fn(), goBack: jest.fn()};
  const mockRoute: any = {params: {id: '123'}};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', async () => {
    (productsService.getOne as jest.Mock).mockReturnValue(
      new Promise(() => {}),
    );
    const {getByText} = render(
      <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />,
    );
    expect(getByText('Cargando producto...')).toBeTruthy();
  });

  it('should display product details when loaded', async () => {
    const product = {
      id: '123',
      name: 'Test Product',
      description: 'Desc',
      logo: 'http://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01'),
    };
    (productsService.getOne as jest.Mock).mockResolvedValueOnce(product);
    const {getByText, queryByText} = render(
      <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />,
    );
    await waitFor(() => {
      expect(queryByText('Cargando producto...')).toBeNull();
      expect(getByText(`ID: ${product.id}`)).toBeTruthy();
      expect(getByText('Test Product')).toBeTruthy();
      expect(getByText('Desc')).toBeTruthy();
      expect(getByText(product.date_release.toDateString())).toBeTruthy();
      expect(getByText(product.date_revision.toDateString())).toBeTruthy();
    });
  });

  it('should navigate to "EditProduct" when pressing "Editar"', async () => {
    const product = {
      id: '123',
      name: 'Test Product',
      description: 'Desc',
      logo: 'http://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01'),
    };
    (productsService.getOne as jest.Mock).mockResolvedValueOnce(product);
    const {getByText} = render(
      <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />,
    );
    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
    });
    fireEvent.press(getByText('Editar'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('EditProduct', {
      id: product.id,
    });
  });

  it('should open modal when pressing "Eliminar" and close it when pressing "Cancelar"', async () => {
    const product = {
      id: '123',
      name: 'Test Product',
      description: 'Desc',
      logo: 'http://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01'),
    };
    (productsService.getOne as jest.Mock).mockResolvedValueOnce(product);
    const {getByText, queryByText} = render(
      <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />,
    );
    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
    });
    fireEvent.press(getByText('Eliminar'));
    await waitFor(() => {
      expect(
        getByText(`¿Estás seguro de eliminar el producto ${product.name}?`),
      ).toBeTruthy();
    });
    fireEvent.press(getByText('Cancelar'));
    await waitFor(() => {
      expect(
        queryByText(`¿Estás seguro de eliminar el producto ${product.name}?`),
      ).toBeNull();
    });
  });

  it('should remove product and go back on confirm', async () => {
    const product = {
      id: '123',
      name: 'Test Product',
      description: 'Desc',
      logo: 'http://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01'),
    };
    (productsService.getOne as jest.Mock).mockResolvedValueOnce(product);
    (productsService.remove as jest.Mock).mockResolvedValueOnce({});
    const {getByText} = render(
      <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />,
    );
    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
    });
    fireEvent.press(getByText('Eliminar'));
    await waitFor(() => {
      expect(
        getByText(`¿Estás seguro de eliminar el producto ${product.name}?`),
      ).toBeTruthy();
    });
    await act(async () => {
      fireEvent.press(getByText('Confirmar'));
    });
    expect(productsService.remove).toHaveBeenCalledWith(product.id);
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('should close modal if deletion fails', async () => {
    const product = {
      id: '123',
      name: 'Test Product',
      description: 'Desc',
      logo: 'http://example.com/logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01'),
    };
    (productsService.getOne as jest.Mock).mockResolvedValueOnce(product);
    (productsService.remove as jest.Mock).mockRejectedValueOnce(
      new Error('Fail'),
    );
    const {getByText, queryByText} = render(
      <ProductDetailScreen route={mockRoute} navigation={mockNavigation} />,
    );
    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
    });
    fireEvent.press(getByText('Eliminar'));
    await waitFor(() => {
      expect(
        getByText(`¿Estás seguro de eliminar el producto ${product.name}?`),
      ).toBeTruthy();
    });
    await act(async () => {
      fireEvent.press(getByText('Confirmar'));
    });
    await waitFor(() => {
      expect(
        queryByText(`¿Estás seguro de eliminar el producto ${product.name}?`),
      ).toBeNull();
    });
  });
});
