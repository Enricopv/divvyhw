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
  StyleSheet,
  Text,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LineGraph } from '../lib';

const GraphExample = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text>Testing Divvy HW</Text>

      <LineGraph
        data={[
          { x: 0.0, y: 10 },
          { x: 1.0, y: 12 },
          { x: 2.0, y: 18 },
          { x: 3.0, y: 15 },
          { x: 4.0, y: 22 },
        ]}
        style={styles.graph}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  graph: { width: '100%', height: 400 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GraphExample;
