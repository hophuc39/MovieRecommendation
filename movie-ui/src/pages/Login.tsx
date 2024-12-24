import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router";
import { Text, Flex, TextField, Button } from "@radix-ui/themes";

import { auth } from "../firebaseSetup";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

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


  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      const friendlyErrorMessage = getFriendlyErrorMessage(err.code);
      setError(friendlyErrorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <Text size="8">Login to your account</Text>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Username
          </Text>
          <TextField.Root
            placeholder="Enter your username"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Password
          </Text>
          <TextField.Root
            placeholder="Enter your password"
          />
        </label>
        <Button onClick={handleLogin} color="gray" variant="soft" highContrast >
          Login
        </Button>
      </Flex>
    </div>

  );
};

export default Login;