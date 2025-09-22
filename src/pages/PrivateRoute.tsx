// components/ProtectedRoute.tsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentUser } from '../slices/authSlice';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const {token} = useSelector(selectCurrentUser);
    return token ? <>{children}</> : <Navigate to="/adminlogin" replace />;
};

export default PrivateRoute;