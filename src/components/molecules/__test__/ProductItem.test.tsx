import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductItem from '../ProductItem';
import { Product } from '../../../models/Product';
import { globalStyles } from '../../../styles/globalStyles';

describe('ProductItem Component', () => {
  const mockNavigation = { navigate: jest.fn() };

  const mockProduct: Product = {
    id: '123',
    name: 'Test Product',
    description: 'Test Description',
    logo: 'logo.png',
    date_release: new Date('2024-12-01'),
    date_revision: new Date('2025-12-01'),
  };

  it('should render product name and ID correctly', () => {
    const { getByText } = render(
      <ProductItem product={mockProduct} navigation={mockNavigation} length={1} index={0} />
    );

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('ID: 123')).toBeTruthy();
  });

  it('should navigate to ProductDetail when pressed', () => {
    const { getByText } = render(
      <ProductItem product={mockProduct} navigation={mockNavigation} length={1} index={0} />
    );

    fireEvent.press(getByText('Test Product'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductDetail', { id: '123' });
  });

  it('should apply border style when it is not the last item', () => {
    const { getByTestId } = render(
      <ProductItem product={mockProduct} navigation={mockNavigation} length={3} index={0} />
    );

    expect(getByTestId('product-item')).toHaveStyle(globalStyles.borderItem);
  });

  it('should not apply border style when it is the last item', () => {
    const { getByTestId } = render(
      <ProductItem product={mockProduct} navigation={mockNavigation} length={3} index={2} />
    );

    expect(getByTestId('product-item')).not.toHaveStyle(globalStyles.borderItem);
  });
});
