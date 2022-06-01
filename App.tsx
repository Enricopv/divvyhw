/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LineGraph } from './src/lib';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <SafeAreaView style={backgroundStyle} height={100}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text>Testing Divvy HW</Text>

      <LineGraph
        data={[
          { x: 0.0, y: 10 },
          { x: 1.0, y: 12 },
          { x: 2.0, y: 18 },
          { x: 3.0, y: 15 },
          { x: 4.0, y: 22 },
          { x: 5.0, y: 10 },
        ]}
        style={styles.graph}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  graph: { width: '100%', height: 400, backgroundColor: 'dodgerblue' },
});

export default App;
