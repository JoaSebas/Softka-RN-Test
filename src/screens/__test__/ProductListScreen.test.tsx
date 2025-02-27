import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../ProductListScreen';
import { ERROR_MESSAGES } from '../../constants/errorMessages';

global.fetch = jest.fn();

describe('ProductListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render products from the API', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        data: [
          {
            id: '111',
            name: 'Product A',
            description: 'Desc A',
            date_release: new Date('2024-01-01'),
            date_revision: new Date('2025-01-01'),
            logo: '',
          },
        ],
      }),
    });
    const { getByText } = render(
      <NavigationContainer>
        <ProductListScreen />
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(getByText('Product A')).toBeTruthy();
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should display an error message if the API fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Error'));
    const { getByText } = render(
      <NavigationContainer>
        <ProductListScreen />
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(getByText(ERROR_MESSAGES.NOT_PRODUCTS)).toBeTruthy();
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
