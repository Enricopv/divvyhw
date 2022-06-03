import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeftLong,
  faB,
  faBeerMugEmpty,
} from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AllowanceScreen from './src/screens/AllowanceScreen';
import CompaniesStack from './src/screens/Companies';
import CompareScreen from './src/screens/CompareScreen';
import { RootParamList } from './src/types';

library.add(faB, faSquareCheck, faBeerMugEmpty, faArrowLeftLong);

const Tab = createBottomTabNavigator<RootParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Companies"
          component={CompaniesStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Compare"
          component={CompareScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Allowance"
          component={AllowanceScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
