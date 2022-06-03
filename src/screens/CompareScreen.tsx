import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { TitleText } from '../components';
import dataJSON from '../data.json';
import { CompanyGraph } from '../lib';
import { CompanyProps, RootParamList } from '../types';
import CompanySearch from './CompanySearch';

const { width: screenWidth } = Dimensions.get('window');

type CompanyDetailScreenProps = NativeStackScreenProps<
  RootParamList,
  'CompanyDetail'
>;

const CompareScreen = ({ navigation }: CompanyDetailScreenProps) => {
  const companyData = dataJSON.find(item => item.id === 1) as CompanyProps;

  const [selected, setSelected] = React.useState<number[]>([]);

  const selectedCompanies = dataJSON.filter(item =>
    selected.find(sel => sel === item.id),
  );

  const onRemove = (id: number) => () => {
    setSelected(selected.filter(item => item !== id));
  };

  const data = selectedCompanies.map(item => ({
    ...item,
    graphOptions: {
      color: '#189E6C',
    },
  }));

  React.useLayoutEffect(() => {
    const onItemSelect = (id: number) => {
      setSelected([...selected, id]);
    };

    const onAddPress = () => {
      navigation.navigate('Modal', {
        component: CompanySearch,
        ids: selected,
        onItemSelect,
      });
    };

    navigation.setOptions({
      headerTitleStyle: { fontFamily: 'Test Calibre', fontSize: 18 },
      title: 'Compare',
      headerRight: () => (
        <Pressable onPress={onAddPress} style={{ marginRight: 8 }}>
          <FontAwesomeIcon icon="plus" />
        </Pressable>
      ),
    });
  }, [navigation, companyData, selected]);

  return (
    <SafeAreaView style={styles.center}>
      <ScrollView>
        <CompanyGraph style={styles.graph} data={data} legendEnabled={false} />
        <View style={styles.alignCenter}>
          {data.map(item => (
            <View key={item.id} style={styles.companyContainer}>
              <View style={styles.title}>
                <View style={styles.dot} />
                <TitleText>{item.name}</TitleText>
              </View>
              <Pressable onPress={onRemove(item.id)}>
                <FontAwesomeIcon icon="trash" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alignCenter: { alignItems: 'center' },
  graph: {
    width: screenWidth,
    height: screenWidth * 0.75,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'dodgerblue',
    marginRight: 4,
  },
  title: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    backgroundColor: 'white',
  },
  companyContainer: {
    flexDirection: 'row',
    width: screenWidth * 0.9,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
});

export default CompareScreen;
