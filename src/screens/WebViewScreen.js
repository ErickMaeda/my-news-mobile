import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default ({ navigation, route }) => {

    const [isLoading, setLoading] = useState(true);
    const hideSpinner = () => setLoading(false);
    const { uri, title } = route.params;

    useEffect(() => {
        navigation.setOptions({ title });
    }, []);

    const renderLoading = () => {
        return (
            <View style={styles.containerLoading}>
                <ActivityIndicator size="large" />
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri }}
                onLoadEnd={hideSpinner}
            />
            {isLoading && renderLoading()}
        </View>
    );
};

const styles = StyleSheet.create({
    containerLoading: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.50)'
    }
});