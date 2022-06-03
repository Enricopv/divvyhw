import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export const MoneyText = ({ style, ...props }: TextProps) => {
  return (
    <Text
      style={{ ...styles.main, ...(style as { [key: string]: any }) }}
      {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  main: { fontSize: 18, fontFamily: 'Roboto Mono' },
});
