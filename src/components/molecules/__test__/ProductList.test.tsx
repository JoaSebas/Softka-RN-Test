import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductList from '../ProductList';
import { Product } from '../../../models/Product';
import { View } from 'react-native';

describe('ProductList Component', () => {
  const mockNavigation = { navigate: jest.fn() };

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo1.png',
      date_release: new Date('2024-12-01'),
      date_revision: new Date('2025-12-01'),
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      logo: 'logo2.png',
      date_release: new Date('2024-12-02'),
      date_revision: new Date('2025-12-02'),
    },
  ];

  it('should render the correct number of products', () => {
    const { getAllByTestId } = render(
      <ProductList products={mockProducts} navigation={mockNavigation} />
    );

    expect(getAllByTestId('product-item')).toHaveLength(mockProducts.length);
  });

  it('should render an empty list without crashing', () => {
    const { queryAllByTestId } = render(
      <ProductList products={[]} navigation={mockNavigation} />
    );

    expect(queryAllByTestId('product-item')).toHaveLength(0);
  });

  it('should navigate to the correct product detail when an item is pressed', () => {
    const { getAllByTestId } = render(
      <ProductList products={mockProducts} navigation={mockNavigation} />
    );

    fireEvent.press(getAllByTestId('product-item')[0]);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductDetail', { id: '1' });
  });

  it('should render the refresh control if provided', () => {
    const mockRefreshControl = <View testID="refresh-control" />;
    const { getByTestId } = render(
      <ProductList products={mockProducts} navigation={mockNavigation} refreshControl={mockRefreshControl} />
    );

    expect(getByTestId('refresh-control')).toBeTruthy();
  });
});
