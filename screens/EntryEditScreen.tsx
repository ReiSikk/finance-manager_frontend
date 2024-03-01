import React from 'react'
import { getFocusedRouteNameFromRoute, RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, SafeAreaView, StyleSheet, Button, FlatList, ScrollView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">



const EntryEditScreen = ({route, navigation}: Props) => {


  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const [items, setItems] = React.useState([
    { label: 'Java', value: 'java' },
    { label: 'JavaScript', value: 'js' },
  ]);
   // console.log(route.params.entryId);


  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.heading}>New expense</Text>
       <Text style={styles.label}>Name</Text>
    <TextInput
      style={styles.input}
      placeholder="Name"
      value={text}
    />
     <Text style={styles.label}>Amount</Text>
    <TextInput
      style={[styles.input, styles.amount]}
      value={number}
      placeholder="Amount"
      keyboardType="numeric"
    />
     <Text style={styles.label}>Currency</Text>
        <TextInput
      style={styles.input}
      value={text}
      placeholder="Currency"
    />
     <Text style={styles.label}>Category</Text>
        <TextInput
      style={styles.input}
      value={text}
      placeholder="Category"
    />
        {/* <DropDownPicker
        items={items}
        onChangeItem={(item) => setSelectedValue(item.value)}
      /> */}
     <Text style={styles.label}>Date</Text>
           <TextInput
      style={styles.input}
      value={text}
      placeholder="Date"
    />
     <Text style={styles.label}>Comment</Text>
           <TextInput
      style={styles.input}
      value={text}
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