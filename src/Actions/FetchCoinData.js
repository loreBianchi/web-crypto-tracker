import axios from 'axios';
import apiBaseURL from '../constants/Apis';
import { 
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_ERROR} 
from './ActionsTypes';

const options = {
  headers: {
    'Content-Type': 'application/json'
  }
} 

export default function FetchCoinData() {
  return dispatch => {
    dispatch({type: FETCHING_COIN_DATA})
    return axios.get(`${apiBaseURL}`, options)
      .then(res => {
        dispatch({type: FETCHING_COIN_DATA_SUCCESS, payload: res.data})
      })
      .catch(err => {
        dispatch({type: FETCHING_COIN_DATA_ERROR, payload: err.data})
      })
  }
}
