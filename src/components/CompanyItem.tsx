import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { SubtitleText, TitleText } from '.';
import { CompanyGraph } from '../lib';
import { CompanyProps } from '../types';

const { width } = Dimensions.get('window');

interface CompanyItemProps extends CompanyProps {
  onPress: () => void;
}

export const CompanyItem = (props: CompanyItemProps) => {
  const data = [
    {
      ...props,
      graphOptions: {
        drawFilledEnabled: true,
        color:
          props.revenue[0].value > props.revenue[5].value
            ? '#189E6C'
            : '#F70000',
      },
    },
  ];

  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.companyContainer}>
        <View style={styles.center}>
          <TitleText>{props.name}</TitleText>
          <SubtitleText>
            {props.location?.city}, {props.location?.country}
          </SubtitleText>
        </View>
        <View>
          <CompanyGraph
            style={styles.graph}
            yAxisEnabled={false}
            xAxisEnabled={false}
            legendEnabled={false}
            data={data}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  center: { flexGrow: 1, justifyContent: 'center' },
  graph: {
    width: width * 0.2,
    height: width * 0.2,

    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  companyContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    shadowOpacity: 0,
  },
});
