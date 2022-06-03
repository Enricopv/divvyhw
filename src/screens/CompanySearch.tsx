/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import { CompanyItem } from '../components';
import dataJSON from '../data.json';
import { CompanyProps, RootParamList } from '../types';

type CompaniesScreenProps = NativeStackScreenProps<RootParamList, 'Compare'>;

const CompanySearch = ({ navigation, route }: CompaniesScreenProps) => {
  const [searchText, setSearchText] = React.useState('');
  const ids = route?.params?.ids || [];

  const results = dataJSON
    .filter(item => !ids?.includes(item.id))
    .filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

  const isDarkMode = useColorScheme() === 'dark';

  const onItemPress = (item: CompanyProps) => () => {
    route?.params?.onItemSelect(item.id);
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    const onBackPress = () => {
      navigation.goBack();
    };

    navigation.setOptions({
      headerTitle: 'Search',
      headerTitleStyle: { fontFamily: 'Test Calibre', fontSize: 18 },
      headerBackButtonMenuEnabled: false,
      headerLeft: () => (
        <Pressable onPress={onBackPress}>
          <FontAwesomeIcon icon="arrow-left-long" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.search}
          clearButtonMode="always"
          onChangeText={text => {
            setSearchText(text);
          }}
        />
      </View>
      <FlatList
        data={results}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable>
            <CompanyItem {...item} onPress={onItemPress(item)} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: { paddingHorizontal: 12, width: '100%', paddingVertical: 8 },
  search: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontFamily: 'Test Calibre',
    fontSize: 16,
  },
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

export default CompanySearch;
