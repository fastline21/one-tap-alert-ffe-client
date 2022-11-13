import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import { loadUser, authClearResponse } from 'Services/Actions/auth.action';

import Loading from 'Containers/Loading';

import { USER_TYPES } from 'Constants/user_types';
import { BARANGAY_STAFF_AUTH } from 'Constants/auth_path';

const PrivateRoute = ({
  children,
  authState: { auth, success, error },
  loadUser,
  authClearResponse,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [isUnauth, setIsUnauth] = useState(false);

  const authLogin = async () => {
    if (auth) {
      setIsAuth(true);
      setIsLoading(false);

      return;
    }

    const authToken = localStorage.getItem('token');

    if (authToken) {
      loadUser();

      return;
    }

    setIsAuth(false);
    setIsLoading(false);
  };

  useEffect(() => {
    authLogin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      setIsAuth(true);
      setIsLoading(false);
      authClearResponse();
    }

    if (error) {
      setIsAuth(false);
      setIsLoading(false);
      authClearResponse();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  useEffect(() => {
    if (auth?.user_type_id === USER_TYPES.ADMIN) {
      console.log('auth type', 'admin');
    }

    if (auth?.user_type_id === USER_TYPES.BARANGAY_STAFF) {
      if (!BARANGAY_STAFF_AUTH.includes(location.pathname)) {
        setIsUnauth(true);
      }
    }
  }, [auth, location]);

  if (isLoading) {
    return <Loading />;
  }

  if (isUnauth) {
    navigate('/unauthorized');
  }

  return isAuth ? children : <Navigate to='/login' />;
};

PrivateRoute.propTypes = {
  authState: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  authClearResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, { loadUser, authClearResponse })(
  PrivateRoute
);
