import React, {JSX, useRef, useState} from 'react';
import {Animated, Modal, TouchableOpacity, View, Text} from 'react-native';
import InputField from '../atoms/InputField';
import ProductList from '../molecules/ProductList';
import Button from '../atoms/Button';
import {globalStyles} from '../../styles/globalStyles';
import {Product} from '../../models/Product';
import XIcon from '../icons/XIcon';
import ActionButtons from '../molecules/ActionButtons';

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
      p.description.toLowerCase().includes(search.toLowerCase()),
  );

  const [showModal, setShowModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [product, setProduct] = useState<Product | null>(null);

  const activeModal = (Product:Product) =>{
    setProduct(Product);
    setShowModal(true);
  };

  const handleNavigate = () => {
    navigation.navigate('ProductDetail');
  };

  return (
    <View style={globalStyles.container}>
      <InputField
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
      />
      <View style={globalStyles.flex1}>
        {filtered.length > 0 && (
          <ProductList
            products={filtered}
            navigation={navigation}
            refreshControl={refreshControl}
            onPress={activeModal}
          />
        )}
      </View>
      <View style={globalStyles.buttonContainer}>
        <Button
          text="Agregar"
          onPress={() => navigation.navigate('AddProduct')}
        />
      </View>

      <Modal visible={showModal} transparent animationType="none">
        <View style={globalStyles.modalOverlay}>
          <Animated.View
            style={[
              globalStyles.modalContent,
              {transform: [{translateY: slideAnim}]},
            ]}>
            <View style={globalStyles.modalHeader}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <XIcon size={24} />
              </TouchableOpacity>
            </View>
            <View style={globalStyles.modalBody}>
              <Text style={globalStyles.modalText}>
                ¿Desea ver el detalle del producto {product?.name}?
              </Text>
            </View>

            <ActionButtons
              primaryText="Confirmar"
              onPrimaryPress={handleNavigate}
              primaryType="primary"
              secondaryText="Cancelar"
              onSecondaryPress={() => setShowModal(false)}
              secondaryType="secondary"
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
