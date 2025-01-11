import { signOut } from "firebase/auth";
import { auth } from "../firebaseSetup";

const Logout = () => {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white hover:text-tmdbLightBlue transition-colors duration-200 font-medium"
    >
      Logout
    </button>
  );
};

export default Logout;