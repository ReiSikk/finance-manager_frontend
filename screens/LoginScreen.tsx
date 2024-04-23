import React, { useEffect, useState } from 'react';
import { View, TextInput, AppState, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from'expo-secure-store';
import { AppDispatch } from '../store/store';
import { login } from '../store/UserSlice';

function LoginScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async () => {
        console.log("Logging in...");
       const response = await dispatch(login({username, password}))
         console.log(response, "response in handle login" );
         try {
            if(response.meta.requestStatus === 'fulfilled') {
                await SecureStore.setItemAsync('token', JSON.stringify(response));
                const storedResponse = await SecureStore.getItemAsync('token');
                if (storedResponse) {
                    console.log("Response was stored correctly", response.payload.access_token);
                } else {
                    console.log("Failed to store the response");
                }
            } else {
                console.log("error logging in");
            }
         } catch (error) {
             console.log("error logging in", error);
         }

    }
  return (
    <View>
     
    <Text></Text>
    <Box alignItems="center">
        <Box w="100%" maxWidth="300px">
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Username</FormControl.Label>
                    <Input type="text" placeholder="Username" value={username} 
                        autoCapitalize="none" onChangeText={setUsername}/>
                </Stack>
            </FormControl>
        </Box>

        <Box w="100%" maxWidth="300px">
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" defaultValue="12345" placeholder="Password" 
                        value={password} onChangeText={setPassword}/>
                    <FormControl.HelperText>
                        Must be atleast 6 characters.
                    </FormControl.HelperText>
                </Stack>
            </FormControl>
        </Box>
    </Box>
    
    

    <Box alignItems="center">
        <Button onPress={handleLogin}>Login</Button>
    </Box>
</View>

  )
}

export default LoginScreen