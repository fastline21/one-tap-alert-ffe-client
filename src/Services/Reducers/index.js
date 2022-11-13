import { combineReducers } from 'redux';

import usersReducer from './users.reducer';
import authReducer from './auth.reducer';
import barangaysReducer from './barangays.reducer';
import requestBackupsReducer from './request-backups.reducer';
import emergenciesReducer from './emergencies.reducer';

export default combineReducers({
  usersState: usersReducer,
  authState: authReducer,
  barangaysState: barangaysReducer,
  requestBackupsState: requestBackupsReducer,
  emergenciesState: emergenciesReducer,
});
