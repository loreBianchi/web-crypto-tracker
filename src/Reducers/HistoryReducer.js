import { 
  FETCHING_COIN_HISTORY,
  FETCHING_COIN_HISTORY_SUCCESS,
  FETCHING_COIN_HISTORY_ERROR
} from '../Actions/ActionsTypes';

const initialHistory = {
  isFetching: null,
  data: [],
  hasError: false,
  errorMessage: null,
};

export default function(state = initialHistory, action) {
  switch (action.type) {
    case FETCHING_COIN_HISTORY:  
      return {
        ...state,
        isFetching: true,
        data: null,
        hasError: false,
        errorMessage: null
      }
    
    case FETCHING_COIN_HISTORY_SUCCESS:  
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        hasError: false,
        errorMessage: null
      }
    
    case FETCHING_COIN_HISTORY_ERROR:  
      return {
        ...state,
        isFetching: false,
        data: null,
        hasError: action.payload.err,
        errorMessage: action.payload.err
      }
  
    default:
      return state;
  }
};