import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
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

  React.useLayoutEffect(() => {
    const onBackPress = () => {
      navigation.goBack();
    };

    navigation.setOptions({
      headerTitleStyle: { fontFamily: 'Test Calibre', fontSize: 18 },
      title: companyData.name,
      headerBackButtonMenuEnabled: false,
      headerLeft: () => (
        <Pressable onPress={onBackPress}>
          <FontAwesomeIcon icon="arrow-left-long" />
        </Pressable>
      ),
    });
  }, [navigation, companyData]);

  return (
    <SafeAreaView style={styles.center}>
      <ScrollView>
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
  const viewStyle = {
    ...styles.revenueItem,
    borderBottomColor: !props.isLast ? 'rgba(0,0,0,0.3)' : undefined,
    borderBottomWidth: !props.isLast ? 1 : undefined,
  };

  return (
    <View style={viewStyle} key={props.seq}>
      <View style={styles.monthText}>
        <Text style={{ fontSize: 20 }}>
          {dateFns.format(new Date(props.date.substring(0, 10)), 'MMM')}
        </Text>
        <Text style={styles.yearText}>
          {' '}
          '{dateFns.format(new Date(props.date.substring(0, 10)), 'yy')}
        </Text>
      </View>
      <Text style={{ fontSize: 18, fontFamily: 'Roboto Mono' }}>
        {formatter.format(props.value)}
      </Text>
    </View>
  );
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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
    paddingVertical: 12,
  },
  revenueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
    fontFamily: 'Test Calibre',
  },
  monthText: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Test Calibre',
  },
  yearText: {
    flexGrow: 1,
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    fontFamily: 'Test Calibre',
  },
});

export default CompanyDetailScreen;
