import { useState, useEffect, useCallback } from 'react';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useNavigate, useSearchParams } from 'react-router';
import { auth } from '../firebaseSetup';
import { toast } from 'react-toastify';
import { Text, Flex, TextField, Button } from '@radix-ui/themes';
import Navbar from '../components/Navbar';
import { useLoading } from '../contexts/LoadingContext';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [email, setEmail] = useState('');
  const { showLoading, hideLoading } = useLoading();
  const [isVerifying, setIsVerifying] = useState(true);

  const oobCode = searchParams.get('oobCode');

  const verifyCode = useCallback(async () => {
    if (!isVerifying) return;

    showLoading();
    try {
      if (!oobCode) {
        throw new Error('Invalid password reset link');
      }
      const email = await verifyPasswordResetCode(auth, oobCode);
      setEmail(email);
      setIsValidCode(true);
    } catch (error) {
      toast.error('Invalid or expired password reset link');
      navigate('/login');
    } finally {
      hideLoading();
      setIsVerifying(false);
    }
  }, [oobCode, navigate, showLoading, hideLoading, isVerifying]);

  useEffect(() => {
    verifyCode();
  }, []);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!oobCode) {
      toast.error('Invalid reset code');
      return;
    }

    setIsLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success('Password reset successful! Please login with your new password.');
      navigate('/login');
    } catch (error: any) {
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidCode) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{
          minHeight: 'calc(100vh - 64px)',
          padding: '20px'
        }}
      >
        <Flex
          direction="column"
          style={{
            maxWidth: '400px',
            width: '100%',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            background: 'white'
          }}
        >
          <Text size="8" mb="6" weight="bold" align="center">
            Reset Password
          </Text>
          <Text size="2" mb="4" color="gray" align="center">
            Reset password for {email}
          </Text>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                New Password
              </Text>
              <TextField.Root
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Confirm New Password
              </Text>
              <TextField.Root
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            <Button
              onClick={handleResetPassword}
              color="gray"
              variant="soft"
              highContrast
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default ResetPassword; 