import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import FormProduct from '../components/molecules/FormProduct';
import {globalStyles} from '../styles/globalStyles';
import {productsService} from '../api/ProductsService';
import {validateExistingProduct} from '../utils/Validations';
import {Product} from '../models/Product';
import {ERROR_MESSAGES} from '../constants/errorMessages';
import ActionButtons from '../components/molecules/ActionButtons';

export default function EditProductScreen({route, navigation}: any) {
  const {id} = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      const p = await productsService.getOne(id);
      if (!p) {
        setErrors({general: ERROR_MESSAGES.GET_PRODUCT});
      }
      setProduct(p);
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  const handleUpdate = async () => {
    if (!product) {
      return;
    }
    setErrors({});

    const newErrors = validateExistingProduct(product);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await productsService.update(product.id, product);
      navigation.goBack();
    } catch (err) {
      setErrors({general: ERROR_MESSAGES.GET_PRODUCT});
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  if (!product) {
    return (
      <View style={globalStyles.container}>
        {Object.values(errors).map((e, i) => (
          <Text key={i} style={globalStyles.error}>
            {e}
          </Text>
        ))}
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.flex1}>
        <FormProduct
          id={product.id}
          setId={() => {}}
          name={product.name}
          setName={(val: any) => setProduct({...product, name: val})}
          description={product.description}
          setDescription={(val: any) =>
            setProduct({...product, description: val})
          }
          logo={product.logo}
          setLogo={(val: any) => setProduct({...product, logo: val})}
          dateRelease={product.date_release}
          setDateRelease={(val: any) =>
            setProduct({...product, date_release: val})
          }
          dateRevision={product.date_revision}
          setDateRevision={(val: any) =>
            setProduct({...product, date_revision: val})
          }
          errors={errors}
          editable={false}
        />
      </ScrollView>
      <ActionButtons
        primaryText="Actualizar"
        onPrimaryPress={handleUpdate}
        primaryType="primary"
        secondaryText="Cancelar"
        onSecondaryPress={() => navigation.goBack()}
        secondaryType="secondary"
      />
    </View>
  );
}
