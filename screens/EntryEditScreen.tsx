import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native'
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">


const EntryEditScreen = ({route, navigation}: Props) => {
    console.log(route.params.entryId);
  return (
    <View>
        <Text>Welcome to the Entry edit screen</Text>
    </View>
  )
}

export default EntryEditScreen