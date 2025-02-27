import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductListContainer from '../ProductListContainer';
import { Product } from '../../../models/Product';
import { View } from 'react-native';

describe('ProductListContainer Component', () => {
  const mockSetSearch = jest.fn();
  const mockNavigation = { navigate: jest.fn() };

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Apple',
      description: 'Fresh apple',
      logo: 'logo1.png',
      date_release: new Date('2024-12-01'),
      date_revision: new Date('2025-12-01'),
    },
    {
      id: '2',
      name: 'Banana',
      description: 'Ripe banana',
      logo: 'logo2.png',
      date_release: new Date('2024-12-02'),
      date_revision: new Date('2025-12-02'),
    },
  ];

  it('should render input field, product list and add button', () => {
    const { getByPlaceholderText, getByText } = render(
      <ProductListContainer
        products={mockProducts}
        search=""
        setSearch={mockSetSearch}
        navigation={mockNavigation}
      />
    );

    expect(getByPlaceholderText('Search...')).toBeTruthy();
    expect(getByText('Agregar')).toBeTruthy();
  });

  it('should update search text when typing', () => {
    const { getByPlaceholderText } = render(
      <ProductListContainer
        products={mockProducts}
        search=""
        setSearch={mockSetSearch}
        navigation={mockNavigation}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Search...'), 'Apple');
    expect(mockSetSearch).toHaveBeenCalledWith('Apple');
  });

  it('should filter products based on search text', () => {
    const { getByText, queryByText } = render(
      <ProductListContainer
        products={mockProducts}
        search="Apple"
        setSearch={mockSetSearch}
        navigation={mockNavigation}
      />
    );

    expect(getByText('Apple')).toBeTruthy();
    expect(queryByText('Banana')).toBeNull();
  });

  it('should navigate to AddProduct when add button is pressed', () => {
    const { getByText } = render(
      <ProductListContainer
        products={mockProducts}
        search=""
        setSearch={mockSetSearch}
        navigation={mockNavigation}
      />
    );

    fireEvent.press(getByText('Agregar'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AddProduct');
  });

  it('should render refresh control if provided', () => {
    const mockRefreshControl = <View testID="refresh-control" />;
    const { getByTestId } = render(
      <ProductListContainer
        products={mockProducts}
        search=""
        setSearch={mockSetSearch}
        navigation={mockNavigation}
        refreshControl={mockRefreshControl}
      />
    );

    expect(getByTestId('refresh-control')).toBeTruthy();
  });
});
