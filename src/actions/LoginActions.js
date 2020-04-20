import { AccessToken, LoginManager } from 'react-native-fbsdk';
import auth, { firebase } from '@react-native-firebase/auth';

export const facebookLogin = async () => {
    try {
        // Login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw new Error('User cancelled the login process');
        }

        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw new Error('Something went wrong obtaining access token');
        }
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        await firebase.auth().signInWithCredential(credential);
    } catch (e) {
        console.error(e);
    }
}

export const logout = async () => {
    try {
        await auth().signOut();
    } catch (e) {
        console.error(e);
    }
};