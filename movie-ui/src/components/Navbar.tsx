import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseSetup";
import tmdbLogo from "../assets/tmdb-logo.png";
import UserMenu from "./UserMenu";
import { Link } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  return (
    <>
      <header className="bg-tmdbDarkBlue sticky top-0 z-50">
        <nav className="max-w-8xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <img
                src={tmdbLogo}
                alt="TMDB Logo"
                className="w-28 cursor-pointer"
                onClick={() => navigate("/")}
              />

              <div className="hidden md:flex space-x-6 text-white">
                <Link
                  to="/movies"
                  className="hover:text-tmdbLightBlue transition-colors"
                >
                  Movies
                </Link>
                <Link
                  to="/people"
                  className="hover:text-tmdbLightBlue transition-colors"
                >
                  People
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <UserMenu />
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-white hover:text-tmdbLightBlue"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-tmdbLightBlue text-white px-4 py-2 rounded hover:bg-tmdbDarkBlue border-2 border-tmdbLightBlue"
                  >
                    Join TMDB
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
