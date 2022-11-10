import axios from 'axios';

import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_CLEAR_RESPONSE,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
} from 'Services/Types/auth.type';

import { setAuthToken } from 'Utilities/token';

const setLoading = () => (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });
};

export const authClearResponse = () => (dispatch) => {
  dispatch({
    type: AUTH_CLEAR_RESPONSE,
  });
};

export const loginUser = (data) => async (dispatch) => {
  try {
    setLoading()(dispatch);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_SERVER_API_KEY,
      },
    };

    const res = await axios.post(`/api/auth`, data, config);
    console.log('Login User -> res.data', res.data);
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });

    loadUser()(dispatch);
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: AUTH_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    setLoading()(dispatch);

    setAuthToken(localStorage.token);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(`/api/auth`, config);

    console.log('Load User -> res.data', res.data);
    dispatch({
      type: AUTH_USER,
      payload: res.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: AUTH_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};
