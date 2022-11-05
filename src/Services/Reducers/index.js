import { combineReducers } from 'redux';

import usersReducer from './users.reducer';
import barangaysReducer from './barangays.reducer';
import requestBackupsReducer from './request-backups.reducer';

export default combineReducers({
  usersState: usersReducer,
  barangaysState: barangaysReducer,
  requestBackupsState: requestBackupsReducer,
});
