import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebaseSetup";
import Logout from "./Logout";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  let isLoggedIn = user ? true : false || false;

  return (
    <nav className="navbar gradient-custom-2">
      <div className="px-3 navbar-logo" onClick={() => navigate("/DashBoard")}>
        <span className="logo-icon">
          <img src="/fixed_logo.png" style={{ width: '80px' }} alt="logo" />
        </span>
        <span className="logo-text">Bloom Access</span>
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <a href="/DashBoard">Home</a>
          </>
        ) : (
          <>
            <a href="/">Home</a>
          </>
        )}

        {/* <a href="#about">About Us</a> */}
        <a href="/Search">Search</a>
        {/* <a href="#support">Support</a> */}
        {/* <div className="dropdown">
                    <a href="#pages" className="dropdown-toggle">
                        Pages ▼
                    </a>
                    <div className="dropdown-menu">
                        <a href="#page1">Page 1</a>
                        <a href="#page2">Page 2</a>
                    </div>
                </div> */}
      </div>
      {/* <Search/> */}
      <div className="navbar-buttons px-3">
        {isLoggedIn ? (
          <Logout />
        ) : (
          <>
            <button className="btn-signin" onClick={() => navigate("/login")}>Login</button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
