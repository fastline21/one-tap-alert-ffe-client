import {
  USERS_LOADING,
  USERS_SUCCESS,
  USERS_ERROR,
  USERS_CLEAR_RESPONSE,
  GET_ALL_USERS,
  GET_USER,
} from 'Services/Types/users.type';

const initialState = {
  users: null,
  user: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload.users,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    }
    case USERS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    }
    case USERS_CLEAR_RESPONSE:
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
