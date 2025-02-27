import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, RefreshControl } from 'react-native';
import ProductListContainer from '../components/organisms/ProductListContainer';
import { globalStyles } from '../styles/globalStyles';
import { productsService } from '../api/ProductsService';
import { Product } from '../models/Product';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export default function ProductListScreen({ navigation }: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      setError(null);
      const data = await productsService.getAll();
      setProducts(data);
    } catch {
      setError(ERROR_MESSAGES.NOT_PRODUCTS);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (error) {
    return (
      <View style={globalStyles.container} testID="error-container">
        <Text style={globalStyles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ProductListContainer
      products={products}
      search={search}
      setSearch={setSearch}
      navigation={navigation}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
