
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryListScreen from './screens/EntryListScreen';
import EntryEditScreen from './screens/EntryEditScreen';
import EntryDeleteScreen from './screens/EntryDeleteScreen';
import LoginScreen from './screens/LoginScreen';
import CategoryScreen from './screens/CategoryScreen';
import SignupScreen from './screens/SignupScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { store } from './store/store'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { NativeBaseProvider } from "native-base";


//map the route names to the params of the route meaning define a type for the params of each route
export type RootStackParamList = {
  // specifying undefined means that the route doesn't have params
  SignupScreen: undefined;
  LoginScreen: undefined;
  EntryList: undefined;
  EntryEdit: { entryId: number };
  EntryDelete: { entryId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const EntryStackNavigator = () => {

  return (
    <Stack.Navigator initialRouteName='SignupScreen'>
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="EntryList" component={EntryListScreen} />
        <Stack.Screen name="EntryEdit" component={EntryEditScreen} />
        <Stack.Screen name="EntryDelete" component={EntryDeleteScreen} />
      </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
// Create a client
const queryClient = new QueryClient()

export default function App() {
  const isSignedIn = false;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <NavigationContainer>
          {isSignedIn ? (
        <Tab.Navigator>
         <Tab.Screen 
        name="Home" 
        component={EntryStackNavigator} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color="blue" />
          ),
            headerShown: false
          }} />
        <Tab.Screen 
        name="Categories" 
        component={CategoryScreen} 
        options={{
          tabBarIcon: ({ color }) => (
      <MaterialIcons name="category" size={24} color="blue" />
          ),
            headerShown: true
          }} />
      </Tab.Navigator>) : (
          <>
            <Stack.Navigator>
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </Stack.Navigator>
          </>
      )}
     
        </NavigationContainer>
        </NativeBaseProvider>
        </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
