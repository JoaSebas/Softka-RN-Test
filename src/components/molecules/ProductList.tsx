import React, { JSX } from 'react';
import { FlatList, View } from 'react-native';
import ProductItem from './ProductItem';
import { Product } from '../../models/Product';
import { globalStyles } from '../../styles/globalStyles';

interface Props {
  products: Product[];
  navigation: any;
  refreshControl?: JSX.Element;
}

export default function ProductList({ products, navigation, refreshControl }: Props) {
  return (
    <View style={globalStyles.listContainer}>
      <FlatList
        testID="product-flatlist"
        style={globalStyles.listView}
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ProductItem product={item} navigation={navigation} length={products.length} index={index} />
        )}
        refreshControl={refreshControl}
      />
    </View>
  );
}
