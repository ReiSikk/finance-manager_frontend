import React, { useEffect, useState } from 'react';
import { View, TextInput, AppState, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { signup } from '../store/UserSlice';
import { RootStackParamList } from '../App';


type Props = NativeStackScreenProps<RootStackParamList, "SignupScreen">


function SignupScreen(props: Props) {

    const dispatch = useDispatch<AppDispatch>();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignUp = () => {
        dispatch(signup({username, password}))
        .then(() => {
            setIsLoggedIn(true);
        })

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
        <Button onPress={handleSignUp}>Sign-up</Button>
    </Box>
    <Text style={{textAlign: 'center'}} onPress={() => props.navigation.navigate("LoginScreen")}>Already have an account? Login</Text>
</View>

  )
}

export default SignupScreen