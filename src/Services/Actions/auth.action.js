import axios from 'axios';

import {
  AUTH_LOADING,
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

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });

    loadUser()(dispatch);
  } catch (error) {
    console.error(JSON.stringify(error));

    dispatch({
      type: AUTH_ERROR,
      payload: {
        message: error.response.data.message,
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

    dispatch({
      type: AUTH_USER,
      payload: res.data,
    });
  } catch (error) {
    console.error(JSON.stringify(error));

    dispatch({
      type: AUTH_ERROR,
      payload: {
        message: error.response.data.message,
      },
    });
  }
};

export const logoutUser = () => (dispatch) => {
  setLoading()(dispatch);

  dispatch({
    type: LOGOUT_USER,
  });
};
