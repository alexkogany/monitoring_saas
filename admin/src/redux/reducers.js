import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import chart from './charts/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  chart,
});

export default reducers;