import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const FillerScreen = () => {
  return (
    <SafeAreaView style={styles.center}>
      <Text>Filler</Text>
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

export default FillerScreen;
