import { combineReducers } from 'redux';

import auth from './auth'
import user from './user'
import videos from './vodeo'

export const reducers = combineReducers({ videos,auth,user });