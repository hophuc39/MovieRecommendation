import Navbar from "../components/Navbar";
import TrendingMovies from "../components/TrendingMovies";
import LatestTrailers from "../components/LatestTrailers";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-[url('/hero-background.jpg')] bg-cover bg-center py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-tmdbDarkBlue/90 to-tmdbDarkBlue/70" />
        <div className="relative max-w-8xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome.</h1>
          <h2 className="text-2xl text-white mb-8">
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>

          {/* Search Bar */}
          <div className="flex">
            <input
              type="text"
              placeholder="Search for a movie, tv show, person......"
              className="flex-1 px-6 py-4 rounded-l-full text-lg focus:outline-none"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-tmdbLightGreen to-tmdbLightBlue text-white rounded-r-full font-bold hover:opacity-90">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="max-w-8xl mx-auto px-4 py-12">
        <TrendingMovies />
      </div>

      {/* Latest Trailers Section */}
      <LatestTrailers />
    </div>
  );
};

export default Home;