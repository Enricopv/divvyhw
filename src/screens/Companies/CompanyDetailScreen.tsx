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
import { CompanyGraph } from '../../lib';
import { CompanyProps, RootParamList } from '../../types';

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

  const companyData = data.find(
    item => item.id === route.params.id,
  ) as CompanyProps;

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
      </View>
      <View>
        <CompanyGraph style={styles.graph} data={companyData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  graph: {
    width: screenWidth,
    height: screenWidth * 0.75,
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
