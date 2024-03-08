import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { RootStackParamList } from '../App';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchEntries } from '../store/EntrySlice';
import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Category } from '../entities/category';



type Props = NativeStackScreenProps<RootStackParamList, "EntryList">

type ItemProps = {name: string, amount: number, currency: string, comment: string, description: string, /* category: Category */};
const Item = ({name, amount, currency, comment, description, /* category */}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.white}>{amount}</Text>
    <Text style={styles.white}>{currency}</Text>
    <Text style={styles.white}>{comment}</Text>
    <Text style={styles.white}>{description}</Text>
   {/*  {category !== null ? <Text>{category.name}</Text> : <Text>Category not set</Text>} */}
  </View>
);


const EntryListScreen = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entry.entries);

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

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
        data={entries}
        renderItem={({item}) => <Item name={item.name} amount={item.amount} currency={item.currency} comment={item.comment} description={item.description} /* category={item.category} */ />}
        keyExtractor={item => item.id.toString()}
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
    backgroundColor: '#474350',
    borderRadius: 8,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    color: 'white',
  },
  title: {
    fontSize: 32,
    color: 'white',
  },
  white: {
    color: 'white',
  }
});