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
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import data from '../../data.json';
import { CompanyProps, RootParamList } from '../../types';

const { width } = Dimensions.get('window');

type CompaniesScreenProps = NativeStackScreenProps<
  RootParamList,
  'CompaniesScreen'
>;

const CompaniesScreen = ({ navigation }: CompaniesScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const onItemPress = (item: CompanyProps) => () => {
    navigation.navigate('CompanyDetail', { id: item.id });
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={data}
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: 'center' }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CompanyItem {...item} onPress={onItemPress(item)} />
        )}
      />
    </SafeAreaView>
  );
};

interface CompanyItemProps extends CompanyProps {
  onPress: () => void;
}

const CompanyItem = (props: CompanyItemProps) => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.shadow}>
        <View style={styles.companyContainer}>
          <View style={{ flexGrow: 1 }}>
            <Text style={{ fontSize: 18 }}>{props.name}</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>
              {props.location.city}, {props.location.country}
            </Text>
          </View>
          <View>
            <View style={styles.graph} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
  graph: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 8,
    padding: 4,
    borderRadius: 8,
    shadowOpacity: 0,
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
  },
});

export default CompaniesScreen;
