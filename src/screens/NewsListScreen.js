import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '@react-navigation/native';
import moment from 'moment';

const imagePlaceholder = require('../../res/images/news-placeholder.png');

export default function ({ navigation, route }) {

    const { colors } = useTheme();
    const news = useSelector((store) => store.news.filter((newsItem) => newsItem.categories.map((category) => category.id).includes(route.params?.newsTypeId)));
    const navigateNews = (news) => {
        navigation.navigate('WebViewStack', { uri: news.url, title: "News" });
    };

    const renderNormalItem = (item) => {
        return (
            <TouchableOpacity key={item.id} style={[styles.newsContainer, { flexDirection: 'row', padding: 20, marginVertical: 5 }]} onPress={() => navigateNews(item)}>
                <Image
                    style={{ width: 80, height: 65, borderRadius: 4 }}
                    source={{ uri: (!item.image || item.image === "None") ? "https://www.stellatechnology-sa.com/images/common/news-placeholder.png" : item.image }}
                    loadingIndicatorSource={{ uri: imagePlaceholder }}
                />
                <View style={{ marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faClock} size={15} color={colors.text} />
                        <View style={{ width: 4 }} />
                        <Text style={styles.textPublished}>{moment(item.published, 'YYYY-MM-DD HH:mm:ss').fromNow()}</Text>
                    </View>
                    <View style={{ height: 5 }} />
                    <Text style={styles.newsTextDescription} numberOfLines={3} ellipsizeMode={'tail'}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    const renderHeaderItem = (item) => {
        return (
            <TouchableOpacity key={item.id} style={styles.newsContainer} onPress={() => navigateNews(item)}>
                <Image
                    style={{ width: '100%', height: 200 }}
                    source={{ uri: (!item.image || item.image === "None") ? "https://www.stellatechnology-sa.com/images/common/news-placeholder.png" : item.image }}
                    loadingIndicatorSource={{ uri: imagePlaceholder }}
                />
                <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faClock} size={15} color={colors.text} />
                        <View style={{ width: 4 }} />
                        <Text style={styles.textPublished}>{moment(item.published, 'YYYY-MM-DD HH:mm:ss').fromNow()}</Text>
                    </View>
                    <Text style={styles.newsHeaderText}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    const renderItem = ({ item, index }) => {
        if (index === 0) {
            return renderHeaderItem(item);
        } else {
            return renderNormalItem(item);
        }
    };

    const styles = {
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        newsContainer: {
            backgroundColor: colors.card,
            shadowColor: colors.border,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 1
        },
        newsHeaderText: {
            fontSize: 17,
            color: colors.text
        },
        newsTextDescription: {
            fontSize: 15,
            marginEnd: 50,
            color: colors.text
        },
        textPublished: {
            fontSize: 12,
            color: colors.text
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};