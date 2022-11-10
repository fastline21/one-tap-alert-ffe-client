import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadUser } from 'Services/Actions/auth.action';

import Loading from 'Containers/Loading';

const PrivateRoute = ({
  children,
  isAuthRoute = true,
  authState: { auth, success, error, message },
  loadUser,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const authLogin = async () => {
    if (auth) {
      setIsAuth(true);
      setIsLoading(false);

      if (!isAuthRoute) {
        return <Navigate to='/' />;
      }

      return;
    }

    const authToken = localStorage.getItem('token');

    if (authToken) {
      loadUser();

      return;
    }

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
    }

    if (error) {
      setIsLoading(false);
    }
  }, [success, error, isAuthRoute]);

  if (isLoading) {
    return <Loading />;
  }

  return isAuth ? (
    isAuthRoute ? (
      children
    ) : (
      <Navigate to='/' />
    )
  ) : (
    <Navigate to='/login' />
  );
};

PrivateRoute.propTypes = {
  authState: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, { loadUser })(PrivateRoute);
