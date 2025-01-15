import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";
import { auth } from "../firebaseSetup";
import { useState } from "react";
import { applyActionCode } from "firebase/auth";
import { toast } from "react-toastify";

const EmailVerified = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  const [isVerifying, setIsVerifying] = useState(true);

  const verifyCode = useCallback(async () => {
    if (!isVerifying) return;
    try {
      if (!oobCode) {
        throw new Error('Invalid email verification link');
      }
      await applyActionCode(auth, oobCode);
      toast.success('Email verified successfully');
    } catch (error) {
      toast.error('Invalid or expired email verification link');
    } finally {
      setIsVerifying(false);
    }
  }, [isVerifying]);

  useEffect(() => {
    verifyCode();
  }, [verifyCode]);

  return <div>Email Verified</div>;
};

export default EmailVerified;