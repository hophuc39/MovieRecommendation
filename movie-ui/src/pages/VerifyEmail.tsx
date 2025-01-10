import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseSetup';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const [user] = useAuthState(auth);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.emailVerified) {
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return currentTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [user, navigate]);

  const resendVerificationEmail = async () => {
    try {
      if (user) {
        await sendEmailVerification(user);
        setTimeLeft(60);
        toast.success('Verification email resent!');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const checkVerification = () => {
    user?.reload().then(() => {
      if (user.emailVerified) {
        navigate('/');
        toast.success('Email verified successfully!');
      } else {
        toast.error('Email not verified yet. Please check your inbox.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
        <p className="mb-4">
          We've sent a verification email to:
          <br />
          <span className="font-bold">{user?.email}</span>
        </p>
        <p className="mb-6">Please check your inbox and click the verification link.</p>

        <button
          onClick={checkVerification}
          className="w-full bg-tmdbLightBlue text-white p-2 rounded hover:bg-tmdbDarkBlue mb-4"
        >
          I've verified my email
        </button>

        <button
          onClick={resendVerificationEmail}
          disabled={timeLeft > 0}
          className={`w-full p-2 rounded ${timeLeft > 0
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-white text-tmdbLightBlue border border-tmdbLightBlue hover:bg-gray-100'
            }`}
        >
          {timeLeft > 0
            ? `Resend email in ${timeLeft}s`
            : 'Resend verification email'}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail; 