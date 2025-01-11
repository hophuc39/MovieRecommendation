import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseSetup';
import { toast } from 'react-toastify';
import { Text, Flex, TextField, Button } from '@radix-ui/themes';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      let message = 'Failed to send reset email';
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email address';
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

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
            Enter your email address and we'll send you instructions to reset your password.
          </Text>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <Button
              onClick={handleResetPassword}
              color="gray"
              variant="soft"
              highContrast
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Flex align="center" justify="center" gap="2" mt="4">
              <Text size="2" color="gray">
                Remember your password?
              </Text>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Text size="2" color="blue" style={{ cursor: 'pointer' }}>
                  Login here
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default ForgotPassword; 