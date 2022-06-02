import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import data from '../../data.json';
import { LineGraph } from '../../lib';
import { RootParamList } from '../../types';

const { width: screenWidth } = Dimensions.get('window');

type CompanyDetailScreenProps = NativeStackScreenProps<
  RootParamList,
  'CompanyDetail'
>;

const CompanyDetailScreen = ({
  navigation,
  route,
}: CompanyDetailScreenProps) => {
  console.log(route.params.id);

  const companyData = data.find(item => item.id === route.params.id);

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.center}>
      <View style={styles.header}>
        <Pressable onPress={onBackPress}>
          <Text>Back</Text>
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{companyData?.name}</Text>
        <View>
          <LineGraph
            style={styles.graph}
            data={[
              { x: 0.0, y: 10 },
              { x: 1.0, y: 12 },
              { x: 2.0, y: 18 },
              { x: 3.0, y: 15 },
              { x: 4.0, y: 22 },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  graph: {
    width: screenWidth,
    height: screenWidth * .75,
  },
  center: {
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleContainer: {
    paddingHorizontal: 8,
  },
});

export default CompanyDetailScreen;
