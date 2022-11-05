import {
  REQUEST_BACKUPS_LOADING,
  REQUEST_BACKUPS_SUCCESS,
  REQUEST_BACKUPS_ERROR,
  REQUEST_BACKUPS_CLEAR_RESPONSE,
  GET_ALL_REQUEST_BACKUPS,
  GET_REQUEST_BACKUP,
} from 'Services/Types/request-backups.type';

const initialState = {
  requestBackups: null,
  requestBackup: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REQUEST_BACKUPS:
      return {
        ...state,
        requestBackups: action.payload,
        loading: false,
      };
    case GET_REQUEST_BACKUP:
      return {
        ...state,
        requestBackup: action.payload,
        loading: false,
      };
    case REQUEST_BACKUPS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_BACKUPS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    }
    case REQUEST_BACKUPS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    }
    case REQUEST_BACKUPS_CLEAR_RESPONSE:
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
