import { signOut } from "firebase/auth";
import { auth } from "../firebaseSetup";

const Logout = () => {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };

  return (
    <div>
        <button className="btn-signout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;