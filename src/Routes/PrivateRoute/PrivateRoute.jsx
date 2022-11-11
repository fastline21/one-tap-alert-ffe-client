import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadUser, authClearResponse } from 'Services/Actions/auth.action';

import Loading from 'Containers/Loading';

const PrivateRoute = ({
  children,
  authState: { auth, success, error },
  loadUser,
  authClearResponse,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

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

  if (isLoading) {
    return <Loading />;
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
