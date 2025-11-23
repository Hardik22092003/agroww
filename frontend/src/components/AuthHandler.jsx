import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthHandler = ({ children, expectedRole }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const refreshToken = urlParams.get('refreshToken');

    if (token && refreshToken) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      const cleanPath = location.pathname;
      navigate(cleanPath, { replace: true });
    }
  }, [location, navigate]);

  return children;
};

export default AuthHandler;
