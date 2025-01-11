import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLoading } from "../contexts/LoadingContext";
import { auth } from "../firebaseSetup";
import tmdbLogo from "../assets/tmdb-logo.png";
import SearchContainer from "./SearchContainer";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  if (loading) {
    showLoading();
  } else {
    hideLoading();
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <header className="bg-tmdbDarkBlue relative z-50">
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
                <div className="relative group">
                  <button className="hover:text-tmdbLightBlue">Movies</button>
                  <div className="absolute left-0 hidden group-hover:block w-48 bg-white shadow-lg py-2 mt-2 z-50">
                    <a href="/movie/popular" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Popular</a>
                    <a href="/movie/now-playing" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Now Playing</a>
                    <a href="/movie/upcoming" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Upcoming</a>
                    <a href="/movie/top-rated" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Top Rated</a>
                  </div>
                </div>

                <div className="relative group">
                  <button className="hover:text-tmdbLightBlue">TV Shows</button>
                  <div className="absolute left-0 hidden group-hover:block w-48 bg-white shadow-lg py-2 mt-2 z-50">
                    <a href="/tv/popular" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Popular</a>
                    <a href="/tv/airing-today" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Airing Today</a>
                    <a href="/tv/on-tv" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">On TV</a>
                    <a href="/tv/top-rated" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Top Rated</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 relative z-50">
              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleSearch}
                    className={`text-white hover:text-tmdbLightBlue transition-colors duration-200 ${isSearchOpen ? 'text-tmdbLightBlue' : ''}`}
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
