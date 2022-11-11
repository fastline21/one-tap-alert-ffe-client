import axios from 'axios';

import {
  USERS_LOADING,
  // USERS_SUCCESS,
  USERS_ERROR,
  USERS_CLEAR_RESPONSE,
  GET_ALL_USERS,
  GET_USER,
} from 'Services/Types/users.type';

const setLoading = () => (dispatch) => {
  dispatch({
    type: USERS_LOADING,
  });
};

export const usersClearResponse = () => (dispatch) => {
  dispatch({
    type: USERS_CLEAR_RESPONSE,
  });
};

export const getAllUsersByUserTypeID = (data) => async (dispatch) => {
  setLoading()(dispatch);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.get(`/api/users/type/${data}`, config);

    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      // payload:
    });
  }
};

export const getAllUsersByUserStatusID = (data) => async (dispatch) => {
  setLoading()(dispatch);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.get(`/api/users/status/${data}`, config);

    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      // payload:
    });
  }
};

export const getUser = (data) => async (dispatch) => {
  setLoading()(dispatch);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.get(`/api/users/${data}`, config);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      // payload:
    });
  }
};
