import React, { useEffect, useState } from 'react';
import { View, TextInput, AppState, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';

function LoginScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        <Button /*onPress={handleLogin}*/>Login</Button>
    </Box>
</View>

  )
}

export default LoginScreen