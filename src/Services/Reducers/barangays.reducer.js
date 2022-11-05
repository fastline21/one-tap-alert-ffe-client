import {
  BARANGAYS_LOADING,
  BARANGAYS_SUCCESS,
  BARANGAYS_ERROR,
  BARANGAYS_CLEAR_RESPONSE,
  GET_ALL_BARANGAYS,
  GET_BARANGAY,
} from 'Services/Types/barangays.type';

const initialState = {
  barangays: null,
  barangay: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BARANGAYS:
      return {
        ...state,
        barangays: action.payload,
        loading: false,
      };
    case GET_BARANGAY:
      return {
        ...state,
        barangay: action.payload,
        loading: false,
      };
    case BARANGAYS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BARANGAYS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    }
    case BARANGAYS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
    }
    case BARANGAYS_CLEAR_RESPONSE:
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
