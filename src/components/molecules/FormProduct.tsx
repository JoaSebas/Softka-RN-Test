import React from 'react';
import { View } from 'react-native';
import InputField from '../atoms/InputField';
import DatePickerField from '../atoms/DatePickerField';

const FormProduct = ({
  id,
  setId,
  name,
  setName,
  description,
  setDescription,
  logo,
  setLogo,
  dateRelease,
  setDateRelease,
  dateRevision,
  setDateRevision,
  errors,
  editable,
}: any) => (
  <View>
    <InputField label="ID" value={id} onChangeText={setId} errors={errors.id ? [errors.id] : []} editable={editable}/>
    <InputField label="Nombre" value={name} onChangeText={setName} errors={errors.name ? [errors.name] : []} />
    <InputField label="Descripción" value={description} onChangeText={setDescription} errors={errors.description ? [errors.description] : []} />
    <InputField label="Logo" value={logo} onChangeText={setLogo} errors={errors.logo ? [errors.logo] : []} />
    <DatePickerField label="Fecha Liberación" date={dateRelease} setDate={setDateRelease} errors={errors.dateRelease ? [errors.dateRelease] : []} />
    <DatePickerField label="Fecha Revisión" date={dateRevision} setDate={setDateRevision} errors={errors.dateRevision ? [errors.dateRevision] : []} />
  </View>
);

export default FormProduct;
