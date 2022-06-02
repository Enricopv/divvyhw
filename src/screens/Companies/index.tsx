import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CompaniesScreen from './CompaniesScreen';
import CompanyDetailScreen from './CompanyDetailScreen';

type CompaniesStackParamList = {
  CompaniesScreen: undefined;
  CompanyDetail: { id: number };
};

const Stack = createNativeStackNavigator<CompaniesStackParamList>();

const CompaniesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="CompaniesScreen"
        component={CompaniesScreen}
      />
      <Stack.Screen
        name="CompanyDetail"
        component={CompanyDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CompaniesStack;
