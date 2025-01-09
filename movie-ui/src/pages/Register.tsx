import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { Text, Flex, TextField, Button } from "@radix-ui/themes";
import { toast } from 'react-toastify';

import { auth } from "../firebaseSetup";
import Navbar from "../components/Navbar";
import { useAuthRedirect } from '../hooks/useAuthRedirect';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useAuthRedirect();

  const getFriendlyErrorMessage = (errorCode: string) => {
    const errorMessages = new Map<string, string>([
      ["auth/email-already-in-use", "This email is already registered. Please use a different email."],
      ["auth/invalid-email", "Please enter a valid email address."],
      ["auth/weak-password", "The password is too weak. Please choose a stronger password."],
      ["auth/network-request-failed", "Network error. Please check your connection and try again."],
    ]);

    return errorMessages.get(errorCode) || "An unknown error occurred. Please try again.";
  };

  const validateForm = () => {
    let isValid = true;

    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
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

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully!');
      navigate("/");
    } catch (err: any) {
      const friendlyErrorMessage = getFriendlyErrorMessage(err.code);
      setError(friendlyErrorMessage);
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
            Create an account
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
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Confirm Password
              </Text>
              <TextField.Root
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                color={confirmPasswordError ? "red" : undefined}
              />
              {confirmPasswordError && (
                <Text color="red" size="2" mt="1">
                  {confirmPasswordError}
                </Text>
              )}
            </label>
            {error && (
              <Text color="red" size="2">
                {error}
              </Text>
            )}
            <Button
              onClick={handleRegister}
              color="gray"
              variant="soft"
              highContrast
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Register"}
            </Button>

            <Flex align="center" justify="center" gap="2" mt="4">
              <Text size="2" color="gray">
                Already have an account?
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

export default Register;