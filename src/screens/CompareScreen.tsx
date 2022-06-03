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

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);
const compData = dataJSON.map(item => ({
  ...item,
  color: `#${randomColor()}`,
}));

const CompareScreen = ({ navigation }: CompanyDetailScreenProps) => {
  const companyData = compData.find(item => item.id === 1) as CompanyProps;

  const [selected, setSelected] = React.useState<number[]>([]);
  const [active, setActive] = React.useState<number>();

  const selectedCompanies = compData.filter(item =>
    selected.find(sel => sel === item.id),
  );

  const onRemove = (id: number) => () => {
    setSelected(selected.filter(item => item !== id));
  };

  const data = selectedCompanies.map(item => ({
    ...item,
    graphOptions: {
      color: item.color,
      lineWidth: item.id === active ? 5 : 2,
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
        {!selected.length && (
          <View style={{ justifyContent: 'center' }}>
            <TitleText style={{ textAlign: 'center' }}>
              Use the "+" above to add a company!
            </TitleText>
          </View>
        )}

        <View style={styles.alignCenter}>
          {data.map(item => (
            <View key={item.id} style={styles.companyContainer}>
              <Pressable
                onPress={() => {
                  setActive(item.id);
                }}
                style={{ flexGrow: 1 }}>
                <View style={styles.title}>
                  <View
                    style={{ ...styles.dot, backgroundColor: item.color }}
                  />
                  <TitleText>{item.name}</TitleText>
                </View>
              </Pressable>
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
