import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function ({ navigation, route }) {

    const { colors } = useTheme();

    const renderSwitch = (title, isEnabled) => {
        <View style={styles.containerItem}>
            <View>
                <Text style={styles.text}>Test</Text>
            </View>
            <View>
                <Switch value={true} />
            </View>
        </View>
    }

    const styles = {
        container: {
            flex: 1
        },
        containerItem: {
            margin: 20,
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        text: {
            color: colors.text
        }
    }

    return (
        <View style={styles.container}>
            {renderSwitch("test", true)}
        </View>
    );
};