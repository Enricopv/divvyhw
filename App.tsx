import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeftLong,
  faB,
  faBeerMugEmpty,
  faBuilding,
  faCodeCompare,
  faLineChart,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CompaniesStack from './src/screens/Companies';
import CompanySearch from './src/screens/CompanySearch';
import CompareScreen from './src/screens/CompareScreen';
import { RootParamList } from './src/types';

library.add(
  faB,
  faSquareCheck,
  faBeerMugEmpty,
  faArrowLeftLong,
  faPlus,
  faTrash,
  faBuilding,
  faCodeCompare,
  faLineChart,
);
const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="TabStack">
        <RootStack.Group>
          <RootStack.Screen
            name="TabStack"
            component={TabStack}
            options={{ headerShown: false }}
          />
        </RootStack.Group>
        <RootStack.Group>
          <RootStack.Screen
            name="CompanySearchModal"
            component={CompanySearch}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator<RootParamList>();
const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IconProp = 'building';
          if (route.name === 'Companies') {
            iconName = 'building';
          } else if (route.name === 'Compare') {
            iconName = 'line-chart';
          }
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Companies"
        component={CompaniesStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Compare" component={CompareScreen} />
    </Tab.Navigator>
  );
};

export default App;
