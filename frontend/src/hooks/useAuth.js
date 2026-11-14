import { useSelector, useDispatch } from 'react-redux';
import { setUser, setRole, logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  return {
    user, isAuthenticated, loading, error,
    login: (userData) => dispatch(setUser(userData)),
    switchRole: (role) => dispatch(setRole(role)),
    logoutUser: () => dispatch(logout()),
  };
};

