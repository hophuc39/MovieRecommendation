import { Navigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseSetup';
import { useLoading } from '../contexts/LoadingContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [user, loading] = useAuthState(auth);
  const { showLoading, hideLoading } = useLoading();

  if (loading) {
    showLoading();
    return null;
  } else {
    hideLoading();
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.providerData[0].providerId === 'password' && !user.emailVerified) {
    return <Navigate to="/verify-email" />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 