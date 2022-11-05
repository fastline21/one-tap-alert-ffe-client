import axios from 'axios';

import {
  REQUEST_BACKUPS_LOADING,
  REQUEST_BACKUPS_SUCCESS,
  REQUEST_BACKUPS_ERROR,
  REQUEST_BACKUPS_CLEAR_RESPONSE,
  GET_ALL_REQUEST_BACKUPS,
} from 'Services/Types/request-backups.type';

const setLoading = () => (dispatch) => {
  dispatch({
    type: REQUEST_BACKUPS_LOADING,
  });
};

export const requestBackupsClearResponse = () => (dispatch) => {
  dispatch({
    type: REQUEST_BACKUPS_CLEAR_RESPONSE,
  });
};

export const getAllRequestBackups = () => async (dispatch) => {
  setLoading()(dispatch);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.get('/api/request-backups', config);

    dispatch({
      type: GET_ALL_REQUEST_BACKUPS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REQUEST_BACKUPS_ERROR,
      // payload:
    });
  }
};
