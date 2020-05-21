import {createStore,combineReducers, compose, applyMiddleware} from "redux";
import App from "./modules/app";
import User from "./modules/user";
import thunk from "redux-thunk";

// 模块化 redux 进行合并
const Reducers = combineReducers({App,User})

// 创建一个storage
const Win:any = window
const store = createStore(
    Reducers,
    compose(
        applyMiddleware(...[thunk]),
        Win.__REDUX_DEVTOOLS_EXTENSION__ && Win.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;
