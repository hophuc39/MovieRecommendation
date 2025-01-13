import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseSetup';
import Navbar from "../components/Navbar";
import TrendingMovies from "../components/TrendingMovies";
import LatestTrailers from "../components/LatestTrailers";
import Footer from '../components/Footer';
import { useQuery } from '@tanstack/react-query';
import { getMovies, getNavigate } from '../api/movieApi';
import MovieList from '../components/MovieList';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [basicSearchInput, setBasicSearchInput] = useState('');
  const [aiSearchInput, setAiSearchInput] = useState('');
  const [aiNavigateInput, setAiNavigateInput] = useState('');
  const [isLoadingNavigate, setIsLoadingNavigate] = useState(false);

  const { data: popularMovies } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => getMovies({
      sort: 'popularity.desc',
      page: 1
    })
  });

  const handleBasicSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (basicSearchInput.trim()) {
      navigate(`/movies?search=${encodeURIComponent(basicSearchInput.trim())}`);
    }
  };

  const handleAISearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiSearchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(aiSearchInput.trim())}`);
    }
  };

  const handleAINavigate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (aiNavigateInput.trim()) {
      setIsLoadingNavigate(true);
      const result = await getNavigate(aiNavigateInput.trim());
      console.log(result);
      if (result.is_success) {
        switch (result.route) {
          case 'CAST_PAGE':
            navigate(`/movie/${result.movie_id}/cast`);
            break;
          case 'MOVIE_PAGE':
            navigate(`/movie/${result.movie_id}`);
            break;
        }
      }
      setIsLoadingNavigate(false);
    }
  };

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

            {/* Search Section */}
            <div className="space-y-4">
              {/* Basic Search */}
              <form onSubmit={handleBasicSearch} className="flex">
                <input
                  type="text"
                  value={basicSearchInput}
                  onChange={(e) => setBasicSearchInput(e.target.value)}
                  placeholder="Search for a movie, tv show, person......"
                  className="flex-1 px-6 py-4 rounded-l-full text-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className={`w-[160px] px-8 py-4 ${user
                    ? 'bg-tmdbDarkBlue text-white'
                    : 'bg-white text-tmdbDarkBlue'
                    } rounded-r-full font-bold hover:opacity-90`}
                >
                  Search
                </button>
              </form>

              {/* AI Search */}
              {user && (
                <form onSubmit={handleAISearch} className="flex">
                  <input
                    type="text"
                    value={aiSearchInput}
                    onChange={(e) => setAiSearchInput(e.target.value)}
                    placeholder="Describe any movie you're looking for, eg. 'Romantic Comedy Movie'"
                    className="flex-1 px-6 py-4 rounded-l-full text-lg focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-[160px] px-8 py-4 bg-gradient-to-r from-tmdbLightGreen to-tmdbLightBlue text-white rounded-r-full font-bold hover:opacity-90"
                  >
                    AI Search
                  </button>
                </form>
              )}

              {/* AI Navigation */}
              {user && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAINavigate(e);
                }} className="flex">
                  <input
                    type="text"
                    value={aiNavigateInput}
                    onChange={(e) => setAiNavigateInput(e.target.value)}
                    placeholder="Describe where you want to visit in our systems, eg. 'Casts of Moana'"
                    className="flex-1 px-6 py-4 rounded-l-full text-lg focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-[160px] px-8 py-4 bg-gradient-to-r from-tmdbDarkBlue to-tmdbLightGreen text-white rounded-r-full font-bold hover:opacity-90"
                  >
                    {isLoadingNavigate ? 'Navigating..' : 'AI Navigate'}
                  </button>
                </form>
              )}
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