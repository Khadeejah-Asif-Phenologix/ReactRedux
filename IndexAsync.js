const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require('axios');

// Action Types
const FETCH_USER_DATA = 'FETCH_USER_DATA';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Initial State
const initialState = {
    loading: false,
    users: [],
    error: ''
};

// Action Creators
const FETCH_DATA = () => ({ type: FETCH_USER_DATA });
const FETCH_SUCCESS = (users) => ({ type: FETCH_DATA_SUCCESS, payload: users });
const FETCH_FAILURE = (error) => ({ type: FETCH_DATA_FAILURE, payload: error });

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_DATA:
            return { ...state, loading: true };

        case FETCH_DATA_SUCCESS:
            return { ...state, loading: false, users: action.payload, error: '' };

        case FETCH_DATA_FAILURE:
            return { ...state, loading: false, users: [], error: action.payload };

        default:
            return state;
    }
};

// Custom Middleware Function
const customMiddleware = (storeAPI) => (next) => (action) => {
    if (action.type === 'FETCH_USERS') {
        storeAPI.dispatch(FETCH_DATA());

        axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                const users = response.data.map((user) => user.id);
                storeAPI.dispatch(FETCH_SUCCESS(users));
            })
            .catch((error) => {
                storeAPI.dispatch(FETCH_FAILURE(error.message));
                console.error('Error fetching data:', error.message);
            });
    } else {
        // Pass the action to the next middleware or reducer
        return next(action);
    }
};

// Store
const store = createStore(reducer, applyMiddleware(customMiddleware));

// Subscription
store.subscribe(() => {
    console.log(store.getState());
});

// Dispatch Action
store.dispatch({ type: 'FETCH_USERS' });
