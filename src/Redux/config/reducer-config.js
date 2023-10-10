import { combineReducers } from 'redux';
import { loginReducer } from '../Login/reducers';



const rootReducers = combineReducers({
    loginUserReducer: loginReducer,
}); 

export default rootReducers;