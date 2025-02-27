import React, { JSX } from 'react';
import { View } from 'react-native';
import InputField from '../atoms/InputField';
import ProductList from '../molecules/ProductList';
import Button from '../atoms/Button';
import { globalStyles } from '../../styles/globalStyles';
import { Product } from '../../models/Product';

interface Props {
  products: Product[];
  search: string;
  setSearch: (text: string) => void;
  navigation: any;
  refreshControl?: JSX.Element;
}

export default function ProductListContainer({
  products,
  search,
  setSearch,
  navigation,
  refreshControl,
}: Props) {
  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={globalStyles.container}>
      <InputField value={search} onChangeText={setSearch} placeholder="Search..." />
      <View style={globalStyles.flex1}>
        {filtered.length > 0 && (
          <ProductList
            products={filtered}
            navigation={navigation}
            refreshControl={refreshControl}
          />
        )}
      </View>
      <View style={globalStyles.buttonContainer}>
        <Button text="Agregar" onPress={() => navigation.navigate('AddProduct')} />
      </View>
    </View>
  );
}
