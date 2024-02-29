import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">



const EntryEditScreen = ({route, navigation}: Props) => {


  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
    console.log(route.params.entryId);


  return (
    <SafeAreaView>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={text}
    />
    <TextInput
      style={styles.input}
      onChangeText={onChangeNumber}
      value={number}
      placeholder="useless placeholder"
      keyboardType="numeric"
    />
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});



export default EntryEditScreen