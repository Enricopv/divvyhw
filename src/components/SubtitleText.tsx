import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export const SubtitleText = (props: TextProps) => {
  return (
    <Text style={styles.main} {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  main: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Test Calibre',
  },
});
