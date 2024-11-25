// import redux from 'redux'

const redux = require('redux')
const createStore = redux.createStore;

const combineReducer = redux.combineReducers;


const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

function buyCake (){
    return{
        type: BUY_CAKE,
        info : "First redux action"
    }
}

function buyIceCream (){
    return{
        type: BUY_ICECREAM,
        info : "First redux action"
    }
}

// const intialState = {
//     numberOfCakes : 10,
//     numberOfIceCreams : 20
// }

const intialCakeState = {
    numberOfCakes : 10,
}

const intialIceCreamState = {
    numberOfIceCreams : 20
}

// const reducer = (state = intialState, action) =>{
//     switch (action.type) {
//         case BUY_CAKE:
//             return{
//                 ...state,
//                 numberOfCakes: state.numberOfCakes - 1
//             }
//         case BUY_ICECREAM:
//             return{
//                 ...state,
//                 numberOfIceCreams: state.numberOfIceCreams - 1
//             }        
    
//         default:
//             return state;
//     }
// }

const Cakereducer = (state = intialCakeState, action) =>{
    switch (action.type) {
        case BUY_CAKE:
            return{
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }      
        default:
            return state;
    }
}

const IceCreamReducer = (state = intialIceCreamState, action) =>{
    switch (action.type) {
        case BUY_ICECREAM:
            return{
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - 1
            }      
        default:
            return state;
    }
}

const rootReducer = combineReducer({
    cake : Cakereducer,
    icecream : IceCreamReducer
})

const store = createStore(rootReducer);
console.log("Initial State:", store.getState());
const unsubscribe = store.subscribe(()=>console.log("Updated State",store.getState()));

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());


unsubscribe();