import React, {useEffect, useRef, useState, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Product} from '../models/Product';
import {productsService} from '../api/ProductsService';
import {globalStyles} from '../styles/globalStyles';
import ActionButtons from '../components/molecules/ActionButtons';
import XIcon from '../components/icons/XIcon';

export default function ProductDetailScreen({route, navigation}: any) {
  const {id} = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useFocusEffect(
    useCallback(() => {
      async function loadProduct() {
        const found = await productsService.getOne(id);
        setProduct(found);
      }
      loadProduct();
    }, [id])
  );

  useEffect(() => {
    if (showModal) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showModal, slideAnim]);

  const handleDelete = async () => {
    if (!product) {return;}
    try {
      await productsService.remove(product.id);
      setShowModal(false);
      navigation.goBack();
    } catch (err) {
      setShowModal(false);
    }
  };

  const openModal = () => {
    slideAnim.setValue(300);
    setShowModal(true);
  };


  if (!product) {
    return (
      <View style={globalStyles.container}>
        <Text>Cargando producto...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.containerDetail}>
        <View style={globalStyles.headerDetail}>
          <Text style={[globalStyles.title, globalStyles.titleDetail]}>
            ID: {product.id}
          </Text>
          <Text style={globalStyles.subTitleDetail}>Información Extra</Text>
        </View>

        <View style={globalStyles.containerTextDetail}>
          <Text style={[globalStyles.column50, globalStyles.textDetail]}>
            Nombre
          </Text>
          <Text style={[globalStyles.column50, globalStyles.textDetailBold]}>
            {product.name}
          </Text>
        </View>

        <View style={globalStyles.containerTextDetail}>
          <Text style={[globalStyles.column50, globalStyles.textDetail]}>
            Descripción
          </Text>
          <Text style={[globalStyles.column50, globalStyles.textDetailBold]}>
            {product.description}
          </Text>
        </View>

        <View style={globalStyles.containerTextDetail}>
          <Text style={[globalStyles.column50, globalStyles.textDetail]}>
            Logo
          </Text>
        </View>

        <Image source={{uri: product.logo}} style={globalStyles.logo} />

        <View style={globalStyles.containerTextDetail}>
          <Text style={[globalStyles.column50, globalStyles.textDetail]}>
            Fecha Liberación
          </Text>
          <Text style={[globalStyles.column50, globalStyles.textDetailBold]}>
            {product.date_release.toDateString()}
          </Text>
        </View>

        <View style={globalStyles.containerTextDetail}>
          <Text style={[globalStyles.column50, globalStyles.textDetail]}>
            Fecha Revisión:
          </Text>
          <Text style={[globalStyles.column50, globalStyles.textDetailBold]}>
            {product.date_revision.toDateString()}
          </Text>
        </View>
      </View>
      <ActionButtons
        primaryText="Editar"
        onPrimaryPress={() =>
          navigation.navigate('EditProduct', {id: product.id})
        }
        primaryType="secondary"
        secondaryText="Eliminar"
        onSecondaryPress={openModal}
        secondaryType="danger"
      />

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
                ¿Estás seguro de eliminar el producto {product.name}?
              </Text>
            </View>

            <ActionButtons
              primaryText="Confirmar"
              onPrimaryPress={handleDelete}
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
