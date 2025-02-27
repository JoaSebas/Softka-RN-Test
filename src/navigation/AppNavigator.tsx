/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, Text } from 'react-native';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <SafeAreaView style={globalStyles.flex1}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,

            contentStyle: {
              borderTopColor: colors.border,
              borderTopWidth: 1,
            },
            gestureEnabled:true,
            headerTitle: () => (
              <View style={globalStyles.navContainer}>
                <Text style={globalStyles.navTitle}>BANCO</Text>
              </View>
            ),
            headerBackVisible:false,
            headerTintColor: colors.blue,
          }}
        >
          <Stack.Screen name="ProductList" component={ProductListScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
          <Stack.Screen name="EditProduct" component={EditProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
