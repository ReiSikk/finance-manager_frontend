import React from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './../screens/HomeScreen';
import EntryListScreen from './../screens/EntryListScreen';
import EntryEditScreen from './../screens/EntryEditScreen';
import EntryDeleteScreen from './../screens/EntryDeleteScreen';
import CategoryScreen from './CategoryScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/UserSlice';
/* import { Picture } from '../components/picture'; */
import { IconButton } from "native-base";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";


export type RootStackParamList = {
    EntryList: undefined;
    EntryEdit: { entryId: number };
    EntryDelete: { entryId: number };
    SignupScreen: undefined;
    LoginScreen: undefined;
  };
  
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const EntryStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="EntryList" component={EntryListScreen} />
        <Stack.Screen name="EntryEdit" component={EntryEditScreen} />
        <Stack.Screen name="EntryDelete" component={EntryDeleteScreen} />
      </Stack.Navigator>
  )
}


const MainNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
    /* const isSignedIn = false; */
     const isSignedIn = useSelector((state: RootState) => state.user.token);

    return (
        <NavigationContainer>
        { isSignedIn ? (
            <>
                <Tab.Navigator screenOptions={({ navigation }) => ({
                    headerRight: () => (
                      <IconButton colorScheme="indigo" style={{marginRight: 10}} key={"outline"} 
                        onPress={() => dispatch(logout())} variant={"outline"} _icon={{
                          as: AntDesign,
                          name: "logout"
                        }} />
                    )})}>
                    <Tab.Screen name="Home" component={EntryStackNavigator} />
                    <Tab.Screen name="Categories" component={CategoryScreen} />
                </Tab.Navigator>
            </>
          ) : (
            <>
            {/* <TodoScreen /> */}
              <Stack.Navigator>
                  <Stack.Screen name="SignupScreen" component={SignupScreen} />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
              </Stack.Navigator>
            </>
          )
        }
      </NavigationContainer>
    );
};
export default MainNavigation;