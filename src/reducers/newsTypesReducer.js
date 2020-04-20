const initialState = [];

const newsTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_NEWS_TYPES': {
            return action.payload
        }
        default: {
            return state;
        }
    }
};

export default newsTypesReducer;