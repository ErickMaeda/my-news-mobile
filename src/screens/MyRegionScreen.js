import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function (props) {

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        const documentSnapshot = await firestore()
        .collection('news')
        .get();

        console.log('News', documentSnapshot.docs);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>MyRegion</Text>
        </View>
    );
}