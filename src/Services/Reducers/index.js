import { combineReducers } from 'redux';

import usersReducer from './users.reducer';
import authReducer from './auth.reducer';
import barangaysReducer from './barangays.reducer';
import requestBackupsReducer from './request-backups.reducer';

export default combineReducers({
  usersState: usersReducer,
  authState: authReducer,
  barangaysState: barangaysReducer,
  requestBackupsState: requestBackupsReducer,
});
