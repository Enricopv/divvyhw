import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as dateFns from 'date-fns';
import React from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
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
  const companyData = data.find(
    item => item.id === route.params.id,
  ) as CompanyProps;

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.center}>
      <ScrollView>
        <View style={styles.header}>
          <Pressable onPress={onBackPress}>
            <Text>Back</Text>
          </Pressable>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{companyData?.name}</Text>
        </View>
        <View>
          <CompanyGraph
            style={styles.graph}
            data={[
              {
                ...companyData,
                graphOptions: {
                  drawFilledEnabled: true,
                  color:
                    companyData.revenue[0].value < companyData.revenue[5].value
                      ? '#189E6C'
                      : '#F70000',
                },
              },
              {
                id: 1090,
                name: 'Average',
                revenue: route.params.averages,
                graphOptions: { drawFilledEnabled: false, color: '#1D8BF7' },
              },
            ]}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: screenWidth * 0.9 }}>
            <Text style={styles.revenueTitle}>
              Revenue From The Past 6 Months
            </Text>

            <View>
              {companyData.revenue.map((item, index) => (
                <RevenueItem
                  {...item}
                  isLast={index + 1 >= companyData.revenue.length}
                  key={index}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const RevenueItem = (props: {
  seq: number;
  date: string;
  value: number;
  isLast: boolean;
}) => {
  return (
    <View
      style={{
        ...styles.revenueItem,
        borderBottomColor: !props.isLast && 'rgba(0,0,0,0.3)',
        borderBottomWidth: !props.isLast && 1,
      }}
      key={props.seq}>
      <View style={styles.monthText}>
        <Text style={{ fontSize: 20 }}>
          {dateFns.format(new Date(props.date.substring(0, 10)), 'MMM')}
        </Text>
        <Text style={styles.yearText}>
          {' '}
          {dateFns.format(new Date(props.date.substring(0, 10)), 'yy')}
        </Text>
      </View>
      <Text style={{ fontSize: 24 }}>${props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  graph: {
    width: screenWidth,
    height: screenWidth * 0.75,
  },
  center: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    paddingHorizontal: 8,
  },
  revenueItem: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  revenueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
  monthText: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearText: {
    flexGrow: 1,
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
  },
});

export default CompanyDetailScreen;