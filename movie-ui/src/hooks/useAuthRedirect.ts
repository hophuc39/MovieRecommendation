import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { auth } from '../firebaseSetup';

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);
}; 