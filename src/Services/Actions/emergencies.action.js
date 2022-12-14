import axios from 'axios';

import {
  EMERGENCIES_LOADING,
  EMERGENCIES_SUCCESS,
  EMERGENCIES_ERROR,
  EMERGENCIES_CLEAR_RESPONSE,
  GET_ALL_EMERGENCIES,
  GET_EMERGENCY,
  CLEAR_EMERGENCY,
} from 'Services/Types/emergencies.type';

const setLoading = () => (dispatch) => {
  dispatch({
    type: EMERGENCIES_LOADING,
  });
};

export const getCurrentEmergencies = (data) => async (dispatch) => {
  try {
    setLoading()(dispatch);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.post(
      '/api/emergencies/current-emergencies',
      data,
      config,
    );

    dispatch({
      type: GET_ALL_EMERGENCIES,
      payload: {
        emergencies: res.data,
      },
    });
  } catch (error) {
    console.error(JSON.stringify(error));

    dispatch({
      type: EMERGENCIES_ERROR,
      payload: {
        message: error.response.data.message,
      },
    });
  }
};

/**
 *
 * @param {*} data
 * @returns
 */
export const getEmergency = (data) => async (dispatch) => {
  try {
    setLoading()(dispatch);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.get(`/api/emergencies/${data}`, config);

    dispatch({
      type: GET_EMERGENCY,
      payload: res.data,
    });
  } catch (error) {
    console.error('Error - Emergency:', JSON.stringify(error) || error);

    dispatch({
      type: EMERGENCIES_ERROR,
      payload: {
        message: error.response.data.message,
      },
    });
  }
};

export const clearEmergency = () => (dispatch) => {
  dispatch({
    type: CLEAR_EMERGENCY,
  });
};
