import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { loadData as loadNewsType } from '../actions/NewsTypeActions';
import { loadData as loadNews } from '../actions/NewsActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import WebViewScreen from '../screens/WebViewScreen';
import auth from '@react-native-firebase/auth';
import MenuButton from '../components/MenuButton';
import RoutesDrawer from './RoutesDrawer';

const RootStack = createStackNavigator();

let initialState = true;

export default () => {

    const dispatch = useDispatch();
    const scheme = useColorScheme();
    const [isLoadingAuth, setLoadingAuth] = useState(true);
    const [user, setUser] = useState(null);
    const newsTypes = useSelector((store) => store.newsTypes);

    useEffect(() => {
        const subscriberNewsTypes = dispatch(loadNewsType());
        const subscriberNews = dispatch(loadNews());
        const subscriberAuth = auth().onAuthStateChanged(onAuthStateChanged);
        return () => {
            subscriberNewsTypes();
            subscriberNews();
            subscriberAuth();
        };
    }, []);

    const onAuthStateChanged = (user) => {
        setUser(user);
        setLoadingAuth(false);
    };

    const getStackNavigator = (props) => {
        if (isLoadingAuth || newsTypes.length === 0) {
            return (
                <RootStack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
            );
        } else if (!user) {
            let animationTypeForReplace = 'pop';
            if (initialState) {
                animationTypeForReplace = 'push';
                initialState = false;
            }
            return (
                <RootStack.Screen name="Login" component={LoginScreen} options={{ animationTypeForReplace: animationTypeForReplace, headerShown: false }} />
            );
        } else {
            return (
                <RootStack.Screen
                    name="HomeDrawer"
                    component={RoutesDrawer}
                    options={{
                        title: 'Home',
                        headerStyle: { shadowOpacity: 0 },
                        headerLeft: (props) => <MenuButton {...props} />
                    }}
                />
            );
        }
    };

    const { colors } = useTheme();

    return (
        <AppearanceProvider>
            <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
                <RootStack.Navigator initialRouteName="Loading">
                    {getStackNavigator()}
                    <RootStack.Screen name={"WebViewStack"} component={WebViewScreen} />
                </RootStack.Navigator>
            </NavigationContainer>
        </AppearanceProvider>
    );
};

<NavigationContainer>
    <RootStack.Navigator initialRouteName="Menu">
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Menu" component={Menu} />
    </RootStack.Navigator>
</NavigationContainer>
