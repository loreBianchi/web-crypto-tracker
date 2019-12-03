import { combineReducers } from 'redux';
import CryptoReducer from './CryptoReducer';
import HistoryReducer from './HistoryReducer';

export default combineReducers({
  crypto: CryptoReducer,
  history: HistoryReducer,
});
