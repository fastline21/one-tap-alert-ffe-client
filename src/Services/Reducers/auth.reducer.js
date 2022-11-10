import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_CLEAR_RESPONSE,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
} from 'Services/Types/auth.type';

const initialState = {
  auth: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem('token', action.payload.token);

      return state;
    case AUTH_USER:
      return {
        ...state,
        auth: action.payload,
        loading: false,
        success: true,
      };
    case LOGOUT_USER:
      localStorage.removeItem('token');

      return {
        ...state,
        loading: false,
        error: null,
        auth: null,
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    }
    case AUTH_CLEAR_RESPONSE:
      return {
        ...state,
        success: false,
        error: false,
        message: null,
      };
    default:
      return state;
  }
};
