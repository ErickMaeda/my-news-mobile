import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { logout } from '../actions/LoginActions';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import SettingsScreen from '../screens/SettingsScreen';
import NewsListScreen from '../screens/NewsListScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeTabNavigation = createMaterialTopTabNavigator();
const AppDrawerNavigation = createDrawerNavigator();
const NewsNavigation = createStackNavigator();

const onPressLogout = () => {
    Alert.alert(
        'Logging out',
        'Are you sure?',
        [
            { text: 'Yes', onPress: logout, style: "destructive" },
            { text: 'Cancel', style: "cancel" },
        ],
        { cancelable: false }
    )
};

const renderDrawerIcon = (iconName, focused) => {
    const { colors } = useTheme();
    return (
        <Icon
            name={iconName}
            size={18}
            color={focused ? colors.primary : colors.text}
        />
    );
};

const AppDrawerComponent = () => {
    return (
        <AppDrawerNavigation.Navigator drawerContent={props => <AppDrawerContent {...props} />}>
            <AppDrawerNavigation.Screen name="Home" options={{ drawerIcon: ({ focused }) => renderDrawerIcon("home", focused) }} component={HomeTabs} />
            <AppDrawerNavigation.Screen name="Settings" options={{ drawerIcon: ({ focused }) => renderDrawerIcon("cog", focused) }} component={SettingsScreen} />
        </AppDrawerNavigation.Navigator>
    );
};

const AppDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={onPressLogout}
                icon={({ focused }) => renderDrawerIcon("sign-out-alt", focused)}
            />
        </DrawerContentScrollView>
    );
};

const HomeTabs = () => {
    const newsTypes = useSelector((store) => store.newsTypes);
    return (
        <HomeTabNavigation.Navigator tabBarOptions={{ scrollEnabled: true }}>
            {newsTypes.map(({ id, description }, index) => (
                <HomeTabNavigation.Screen key={index} name={description}>
                    {() => (
                        <NewsNavigation.Navigator mode="modal" headerMode="none">
                            <NewsNavigation.Screen name={"NewsList"} component={NewsListScreen} initialParams={{ newsTypeId: id }} options={{ headerShown: false }} />
                        </NewsNavigation.Navigator>
                    )}
                </HomeTabNavigation.Screen>
            ))}
        </HomeTabNavigation.Navigator>
    );
};

export default AppDrawerComponent;