import {
  EMERGENCIES_LOADING,
  EMERGENCIES_SUCCESS,
  EMERGENCIES_ERROR,
  EMERGENCIES_CLEAR_RESPONSE,
  GET_ALL_EMERGENCIES,
  GET_EMERGENCY,
  CLEAR_EMERGENCY,
} from 'Services/Types/emergencies.type';

const initialState = {
  emergencies: null,
  emergency: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMERGENCIES:
      return {
        ...state,
        emergencies: action.payload.emergencies,
        loading: false,
        success: true,
      };
    case GET_EMERGENCY:
      return {
        ...state,
        emergency: action.payload,
        loading: false,
        success: true,
      };
    case EMERGENCIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case EMERGENCIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    }
    case EMERGENCIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    }
    case EMERGENCIES_CLEAR_RESPONSE:
      return {
        ...state,
        success: false,
        error: false,
        message: null,
      };
    case CLEAR_EMERGENCY:
      return {
        ...state,
        emergency: null,
      };
    default:
      return state;
  }
};
