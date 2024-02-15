import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native'
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, "EntryList">


const EntryListScreen = (props: Props) => {
  return (
    <View>
        <Text>Welcome to the Entry list screen</Text>
        <Button title="Go to Edit" onPress={() => props.navigation.navigate("EntryEdit", { entryId: 1 })} />
    </View>
  )
}

export default EntryListScreen