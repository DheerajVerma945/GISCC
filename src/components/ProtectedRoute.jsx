import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { verifyAdmin } from '../store/authSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { token, admin, loading } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token && !admin) {
      dispatch(verifyAdmin());
    }
  }, [token, admin, dispatch]);

  if (!token) return <Navigate to="/admin/login" replace />;

  if (loading && !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Verifying session…</p>
        </div>
      </div>
    );
  }

  return children;
};

ProtectedRoute.propTypes = { children: PropTypes.node.isRequired };

export default ProtectedRoute;
