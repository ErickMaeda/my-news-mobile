import firestore from '@react-native-firebase/firestore';

export const loadData = () => (dispatch) => {
    return firestore()
        .collection('newsType')
        .limit(5)
        .onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.docs.forEach((document) => {
                items.push({ ...document.data(), id: document.id });
            });
            dispatch({ type: "FETCH_NEWS_TYPES", payload: items });
        });
};