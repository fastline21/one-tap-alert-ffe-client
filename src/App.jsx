import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

import PrivateRoute from 'Routes/PrivateRoute';

import DashboardPage from 'Pages/Dashboard';
import LoginPage from 'Pages/Login';
import ProfilePage from 'Pages/Profile';
import ResidentPage from 'Pages/Resident';
import ResponderPage from 'Pages/Responder';
import BarangayStaffPage from 'Pages/BarangayStaff';
import CommandCenterPage from 'Pages/CommandCenter';
import BarangaysPage from 'Pages/Barangays';
import UserRegistrationApprovalPage from 'Pages/UserRegistrationApproval';
import RequestBackupSupportPage from 'Pages/RequestBackupSupport/RequestBackupSupport.page';
import NotFoundPage from 'Pages/NotFound/NotFound.page';

console.log(process.env.REACT_APP_SERVER_URL);

const App = () => {
  return (
    <Provider store={configureStore}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/resident'
            element={
              <PrivateRoute>
                <ResidentPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/responder'
            element={
              <PrivateRoute>
                <ResponderPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/barangay-staff'
            element={
              <PrivateRoute>
                <BarangayStaffPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/command-center'
            element={
              <PrivateRoute>
                <CommandCenterPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/barangays'
            element={
              <PrivateRoute>
                <BarangaysPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/user-registration-approval'
            element={
              <PrivateRoute>
                <UserRegistrationApprovalPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/request-backup-support'
            element={
              <PrivateRoute>
                <RequestBackupSupportPage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
