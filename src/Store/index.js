import Reducer from "./Reducer/AuthReducer"
import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import MapReducer from "./Reducer/MapReducer"



let combine = combineReducers({
    Reducer,
    MapReducer
})
let middleware = applyMiddleware(thunk)
let Store = createStore(combine, middleware)

Store.subscribe(() => {
    console.log("store State", Store.getState())
})

export default Store