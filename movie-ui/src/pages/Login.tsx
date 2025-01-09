import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { Text, Flex, TextField, Button } from "@radix-ui/themes";
import { toast } from 'react-toastify';

import { auth } from "../firebaseSetup";
import Navbar from "../components/Navbar";
import googleIcon from "../assets/google-icon.png";
import { useAuthRedirect } from '../hooks/useAuthRedirect';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  useAuthRedirect();

  const getFriendlyErrorMessage = (errorCode: string) => {
    const errorMessages = new Map<string, string>([
      ["auth/invalid-credential", "Email or password is incorrect. Please try again."],
      ["auth/email-already-in-use", "This email is already registered. Please use a different email or log in."],
      ["auth/weak-password", "The password is too weak. Please choose a stronger password."],
      ["auth/user-not-found", "No user found with this email. Please check your email or sign up."],
      ["auth/wrong-password", "Incorrect password. Please try again."],
      ["auth/network-request-failed", "Network error. Please check your connection and try again."],
      ["auth/too-many-requests", "Too many login attempts. Please wait a moment and try again."],
    ]);

    return errorMessages.get(errorCode) || "An unknown error occurred. Please try again.";
  };

  const validateForm = () => {
    let isValid = true;

    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setError("");

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate("/");
    } catch (err: any) {
      const friendlyErrorMessage = getFriendlyErrorMessage(err.code);
      setError(friendlyErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google successfully!');
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGoogleLoading(false);
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
          minHeight: 'calc(100vh - 64px)', // Assuming navbar height is 64px
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
            Login to your account
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                color={emailError ? "red" : undefined}
              />
              {emailError && (
                <Text color="red" size="2" mt="1">
                  {emailError}
                </Text>
              )}
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Password
              </Text>
              <TextField.Root
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                color={passwordError ? "red" : undefined}
              />
              {passwordError && (
                <Text color="red" size="2" mt="1">
                  {passwordError}
                </Text>
              )}
            </label>
            {error && (
              <Text color="red" size="2">
                {error}
              </Text>
            )}
            <Button
              onClick={handleLogin}
              color="gray"
              variant="soft"
              highContrast
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <Button
              onClick={handleGoogleLogin}
              color="gray"
              variant="soft"
              highContrast
              disabled={isGoogleLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {isGoogleLoading ? (
                "Connecting to Google..."
              ) : (
                <>
                  <img src={googleIcon} alt="Google" style={{ width: '20px', height: '20px' }} />
                  <Text style={{ fontWeight: 500 }}>Login with Google</Text>
                </>
              )}
            </Button>

            <Flex align="center" justify="center" gap="2" mt="4">
              <Text size="2" color="gray">
                Don't have an account?
              </Text>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Text size="2" color="blue" style={{ cursor: 'pointer' }}>
                  Register here
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Login;