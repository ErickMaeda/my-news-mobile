import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

export default function (props) {
    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <View style={{ marginStart: 20 }}>
            <Icon
                name="bars"
                size={25}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                color={colors.text}
            />
        </View>
    );
}

const styles = StyleSheet.create({

})