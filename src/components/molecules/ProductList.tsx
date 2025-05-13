import React, { JSX } from 'react';
import { FlatList, View } from 'react-native';
import ProductItem from './ProductItem';
import { Product } from '../../models/Product';
import { globalStyles } from '../../styles/globalStyles';

interface Props {
  products: Product[];
  navigation: any;
  refreshControl?: JSX.Element;
  onPress:(Product:Product)=>void
}

export default function ProductList({ products, refreshControl, onPress }: Props) {
  return (
    <View style={globalStyles.listContainer}>
      <FlatList
        testID="product-flatlist"
        style={globalStyles.listView}
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ProductItem product={item} length={products.length} index={index} onPress={onPress} />
        )}
        refreshControl={refreshControl}
      />
    </View>
  );
}
