import firestore from '@react-native-firebase/firestore';

export const loadData = () => (dispatch) => {
    return firestore()
        .collection('news')
        .orderBy('published', 'desc')
        .limit(100)
        .onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.docs.forEach((document) => items.push(document.data()));
            dispatch({ type: "FETCH_NEWS", payload: items });
        });
};
