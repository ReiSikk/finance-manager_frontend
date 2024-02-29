import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { RootStackParamList } from '../App';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';



type Props = NativeStackScreenProps<RootStackParamList, "EntryList">

//TODO: GET the data from the backend
const DATA = [
  {
    id: 'Expense1',
    title: 'First Item',
  },
  {
    id: 'Expense2',
    title: 'Second Item',
  },
  {
    id: 'Expense3',
    title: 'Third Item',
  },
  {
    id: 'Expense4',
    title: 'First Item',
  },
  {
    id: 'Expense5',
    title: 'Second Item',
  },
  {
    id: 'Expense6',
    title: 'Third Item',
  },
  {
    id: 'Expense7',
    title: 'Second Item',
  },
  {
    id: 'Expense8',
    title: 'Third Item',
  },
  {
    id: 'Expense9',
    title: 'Second Item',
  },
  {
    id: 'Expense10',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};
const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


const EntryListScreen = (props: Props) => {
  return (
    <>
    <View style={styles.layoutFlex}>
        <Text style={styles.heading}>My Expenses</Text>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate("EntryEdit", { entryId: 1 })}>
        <AntDesign name="pluscircle" size={24} color="white" />
      <Text style={styles.buttonText}>Add expense</Text>
    </TouchableOpacity>
    <View>
        <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </View>
    </View>
    </>
  )
}

export default EntryListScreen


const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 36,
  },

  addBtn: {
    marginTop: 36,
    backgroundColor: "#24A0ED",
    width: 64,
    height: 64,
    bottom: 20 ,
    right: 20,
    position: "absolute",
    borderRadius: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  layoutFlex: {
    flex: 1,
    flexDirection: 'column',
    position: "relative",
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});