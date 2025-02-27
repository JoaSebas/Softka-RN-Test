import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import FormProduct from '../components/molecules/FormProduct';
import {globalStyles} from '../styles/globalStyles';
import {productsService} from '../api/ProductsService';
import {validateNewProduct} from '../utils/Validations';
import {Product} from '../models/Product';
import {ERROR_MESSAGES} from '../constants/errorMessages';
import ActionButtons from '../components/molecules/ActionButtons';

export default function AddProductScreen({navigation}: any) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [dateRelease, setDateRelease] = useState(new Date());
  const [dateRevision, setDateRevision] = useState(new Date());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAdd = async () => {
    setErrors({});

    const idExists = await productsService.verifyId(id);
    const newErrors = validateNewProduct(
      id,
      name,
      description,
      logo,
      dateRelease,
      dateRevision,
      idExists,
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const product: Product = {
      id,
      name,
      description,
      logo,
      date_release: dateRelease,
      date_revision: dateRevision,
    };

    try {
      await productsService.create(product);
      navigation.goBack();
    } catch (err) {
      setErrors({general: ERROR_MESSAGES.CREATE_PRODUCT});
    }
  };

  const handleReset = () => {
    setId('');
    setName('');
    setDescription('');
    setLogo('');
    setDateRelease(new Date());
    setDateRevision(new Date());
    setErrors({});
  };

  return (
    <View style={[globalStyles.container]}>
      <ScrollView style={globalStyles.flex1}>
        <FormProduct
          id={id}
          setId={setId}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          logo={logo}
          setLogo={setLogo}
          dateRelease={dateRelease}
          setDateRelease={setDateRelease}
          dateRevision={dateRevision}
          setDateRevision={setDateRevision}
          errors={errors}
        />
      </ScrollView>
      <ActionButtons
        primaryText="Enviar"
        onPrimaryPress={handleAdd}
        primaryType="primary"
        secondaryText="Reiniciar"
        onSecondaryPress={handleReset}
        secondaryType="secondary"
      />
    </View>
  );
}
