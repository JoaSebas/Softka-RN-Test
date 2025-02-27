import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ChevronRight from '../icons/ChevronRight';
import { globalStyles } from '../../styles/globalStyles';
import { Product } from '../../models/Product';

interface Props {
  product: Product;
  navigation: any;
  length: number;
  index: number;
}

export default function ProductItem({ product, navigation, length, index }: Props) {
  return (
    <TouchableOpacity
      testID="product-item"
      style={[
        globalStyles.listItem,
        length > 1 && index + 1 !== length ? globalStyles.borderItem : {},
      ]}
      onPress={() => navigation.navigate('ProductDetail', { id: product.id })}
    >
      <View>
        <Text style={globalStyles.listItemText}>{product.name}</Text>
        <Text style={globalStyles.listItemID}>ID: {product.id}</Text>
      </View>
      <ChevronRight size={24} />
    </TouchableOpacity>
  );
}
