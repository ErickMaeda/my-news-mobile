const initialState = [];

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_NEWS': {
            return action.payload
        }
        default: {
            return state;
        }
    }
};

export default newsReducer;