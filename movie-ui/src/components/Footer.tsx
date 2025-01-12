import tmdbLogo from '../assets/tmdb-logo.png';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-tmdbDarkBlue text-white py-12">
      <div className="max-w-8xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1">
            <img src={tmdbLogo} alt="TMDB Logo" className="w-32 mb-4" />
          </div>

          {/* THE BASICS */}
          <div>
            <h3 className="font-bold text-lg mb-4">THE BASICS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-tmdbLightBlue transition-colors">
                  About TMDB
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-tmdbLightBlue transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="https://www.themoviedb.org/documentation/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tmdbLightBlue transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* GET INVOLVED */}
          <div>
            <h3 className="font-bold text-lg mb-4">GET INVOLVED</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contribution" className="hover:text-tmdbLightBlue transition-colors">
                  Contribution Guide
                </Link>
              </li>
              <li>
                <Link to="/apps" className="hover:text-tmdbLightBlue transition-colors">
                  Apps
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-tmdbLightBlue transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* COMMUNITY */}
          <div>
            <h3 className="font-bold text-lg mb-4">COMMUNITY</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/guidelines" className="hover:text-tmdbLightBlue transition-colors">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link to="/discussions" className="hover:text-tmdbLightBlue transition-colors">
                  Discussions
                </Link>
              </li>
              <li>
                <a href="https://twitter.com/themoviedb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tmdbLightBlue transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm">
          <p>© 2025 TMDB AWD. All rights reserved.</p>
          <p className="mt-2">
            This product is a project of AWD Course in HCMUS for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 