import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { auth } from "../firebaseSetup";
import { applyActionCode } from "firebase/auth";
import { toast } from "react-toastify";

const EmailVerified = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  const navigate = useNavigate();

  const verifyCode = async () => {
    try {
      if (!oobCode) {
        throw new Error('Invalid email verification link');
      }
      await applyActionCode(auth, oobCode);
      toast.success('Email verified successfully');
      navigate('/');
    } catch (error) {
      toast.error('Invalid or expired email verification link');
    }
  };

  useEffect(() => {
    verifyCode();
  }, [verifyCode]);

  return <div>Verifying email...</div>;
};

export default EmailVerified;