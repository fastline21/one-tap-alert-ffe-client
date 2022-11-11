import axios from 'axios';

import {
  BARANGAYS_LOADING,
  // BARANGAYS_SUCCESS,
  BARANGAYS_ERROR,
  BARANGAYS_CLEAR_RESPONSE,
  GET_ALL_BARANGAYS,
} from 'Services/Types/barangays.type';

const setLoading = () => (dispatch) => {
  dispatch({
    type: BARANGAYS_LOADING,
  });
};

export const barangaysClearResponse = () => (dispatch) => {
  dispatch({
    type: BARANGAYS_CLEAR_RESPONSE,
  });
};

export const getAllBarangays = () => async (dispatch) => {
  try {
    setLoading()(dispatch);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.get('/api/barangays', config);

    dispatch({
      type: GET_ALL_BARANGAYS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: BARANGAYS_ERROR,
      // payload:
    });
  }
};
