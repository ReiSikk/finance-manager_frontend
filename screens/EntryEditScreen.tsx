import React, { useState } from 'react'
import { getFocusedRouteNameFromRoute, RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, SafeAreaView, StyleSheet, Button, FlatList, ScrollView } from 'react-native'
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">



const EntryEditScreen = ({route, navigation}: Props) => {


  const [entryData, setEntryData] = useState({
    amount: "",
    date: "",
    currency: "",
    category: "",
    name: "",
    comment: "",
  });
  const [number, onChangeNumber] = useState('');

   // console.log(route.params.entryId);
   console.log(entryData, "entryData");


  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.heading}>New expense</Text>
       <Text style={styles.label}>Name</Text>
    <TextInput
      style={styles.input}
      placeholder="Name"
      onChangeText={text => setEntryData({...entryData, name: text})}
      value={entryData.name}
    />
     <Text style={styles.label}>Amount</Text>
    <TextInput
      style={[styles.input, styles.amount]}
      value={entryData.amount}
      onChangeText={text => setEntryData({...entryData, amount: text})}
      placeholder="Amount"
      keyboardType="numeric"
    />
      <TextInput
        style={styles.input}
      onChangeText={text => setEntryData({...entryData, currency: text})}
        value={entryData.currency}
        placeholder="Currency"
      />
     <Text style={styles.label}>Category</Text>
        <TextInput
      style={styles.input}
      onChangeText={text => setEntryData({...entryData, category: text})}
      value={entryData.category}
      placeholder="Category"
    />

     <Text style={styles.label}>Date</Text>
           <TextInput
      style={styles.input}
      onChangeText={text => setEntryData({...entryData, date: text})}
      value={entryData.date}
      placeholder="Date"
    />
     <Text style={styles.label}>Comment</Text>
           <TextInput
      style={styles.input}
      onChangeText={text => setEntryData({...entryData, comment: text})}
      value={entryData.comment}
      placeholder="Comment"
    />
       <Button title="Add Expense" />
    </View>

  </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  input: {
    height: 40,
    marginBottom: 18,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
  },
  amount: {
    width: 80,
  },
  label: {
    fontSize: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});



export default EntryEditScreen