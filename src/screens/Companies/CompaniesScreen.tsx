/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import data from '../../data.json';
import { CompanyProps, RootParamList } from '../../types';
import { getCompanyAverages } from '../../utils/getCompanyAverages';
import { CompanyItem } from '../../components';

type CompaniesScreenProps = NativeStackScreenProps<
  RootParamList,
  'CompaniesScreen'
>;

const CompaniesScreen = ({ navigation }: CompaniesScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const averages = React.useMemo(() => getCompanyAverages(data), []);

  const onItemPress = (item: CompanyProps) => () => {
    navigation.navigate('CompanyDetail', { id: item.id, averages });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Companies List',
      headerTitleStyle: { fontFamily: 'Test Calibre', fontSize: 18 },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={data}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CompanyItem {...item} onPress={onItemPress(item)} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { alignItems: 'center' },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const intialValues = [
  {
    seq: 0,
    date: '2019-03-12',
    value: 0,
  },
  {
    seq: 1,
    date: '2019-02-12',
    value: 0,
  },
  {
    seq: 2,
    date: '2019-01-12',
    value: 0,
  },
  {
    seq: 3,
    date: '2018-12-12',
    value: 0,
  },
  {
    seq: 4,
    date: '2018-11-12',
    value: 0,
  },
  {
    seq: 5,
    date: '2018-10-12',
    value: 0,
  },
];

export default CompaniesScreen;
