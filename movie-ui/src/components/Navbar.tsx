import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useLoading } from "../contexts/LoadingContext";
import { auth } from "../firebaseSetup";
import tmdbLogo from "../assets/tmdb-logo.png";
import SearchContainer from "./SearchContainer";
import UserMenu from "./UserMenu";
import { Link } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

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
                  <button
                    onClick={toggleSearch}
                    className="text-white hover:text-tmdbLightBlue"
                  >
                    {isSearchOpen ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                  </button>
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
      {user && <SearchContainer isOpen={isSearchOpen} />}
    </>
  );
};

export default Navbar;
