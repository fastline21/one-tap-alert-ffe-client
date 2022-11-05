import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

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

const App = () => {
  return (
    <Provider store={configureStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/resident' element={<ResidentPage />} />
          <Route path='/responder' element={<ResponderPage />} />
          <Route path='/barangay-staff' element={<BarangayStaffPage />} />
          <Route path='/command-center' element={<CommandCenterPage />} />
          <Route path='/barangays' element={<BarangaysPage />} />
          <Route
            path='/user-registration-approval'
            element={<UserRegistrationApprovalPage />}
          />
          <Route
            path='/request-backup-support'
            element={<RequestBackupSupportPage />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
