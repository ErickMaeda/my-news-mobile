import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { facebookLogin } from '../actions/LoginActions';

export default function (props) {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <Button
                title={'Login with Facebook'}
                onPress={facebookLogin}
            />
        </View>
    );
}