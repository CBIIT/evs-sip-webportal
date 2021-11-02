import { combineReducers } from 'redux'
import currentUser from './currentUser';
import usersList from './usersList';

const rootReducer = combineReducers({ 
    currentUser,
    usersList
});
export default rootReducer;
