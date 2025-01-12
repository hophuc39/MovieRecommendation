import Navbar from "../components/Navbar";
import TrendingMovies from "../components/TrendingMovies";
import LatestTrailers from "../components/LatestTrailers";
import Footer from '../components/Footer';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../api/movieApi';
import MovieList from '../components/MovieList';

const Home = () => {
  const { data: popularMovies } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => getMovies({
      sort: 'popularity.desc',
      page: 1
    })
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow mb-5">
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

        {/* Popular Movies Section */}
        <div className="max-w-8xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Movies</h2>
            <a
              href="/movies"
              className="text-tmdbLightBlue hover:text-tmdbLightBlue/80"
            >
              View All
            </a>
          </div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400/30 scrollbar-track-transparent">
            {popularMovies?.items && <MovieList movies={popularMovies.items} />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;