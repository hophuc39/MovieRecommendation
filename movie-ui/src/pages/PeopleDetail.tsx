import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { getPeopleDetail } from '../api/movieApi';
import Navbar from '../components/Navbar';
import ProfileImage from '../components/ProfileImage';

const PeopleDetail = () => {
  const { id } = useParams();
  const defaultMovieImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

  const { data: person, isError, isLoading } = useQuery({
    queryKey: ['person', id],
    queryFn: () => getPeopleDetail(id as string),
    enabled: !!id
  });

  if (isLoading) return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-tmdbLightBlue"></div>
      </div>
    </>
  );

  if (isError || !person) return (
    <>
      <Navbar />
      <div className="max-w-8xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Person Not Found</h1>
          <p className="text-gray-600">
            We couldn't find the person you're looking for. The person might have been removed or had its ID changed.
          </p>
        </div>
      </div>
    </>
  );

  // Get movies from cast and crew combined, sorted by popularity
  const getMovies = () => {
    const castMovies = person.movie_credits?.cast || [];
    const crewMovies = person.movie_credits?.crew || [];

    return [...castMovies, ...crewMovies].sort((a, b) => b.popularity - a.popularity);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-8xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column - Profile */}
          <div>
            <div className="rounded-lg overflow-hidden mb-4">
              <ProfileImage
                path={person.profile_path}
                name={person.name}
                className="w-full aspect-[2/3] object-cover"
                type="people"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">Personal Info</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Known For</h3>
                <p>{person.known_for_department}</p>
              </div>
              <div>
                <h3 className="font-bold">Birthday</h3>
                <p>{person.birthday}</p>
              </div>
              {person.deathday && (
                <div>
                  <h3 className="font-bold">Day of Death</h3>
                  <p>{person.deathday}</p>
                </div>
              )}
              <div>
                <h3 className="font-bold">Place of Birth</h3>
                <p>{person.place_of_birth}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Bio and Credits */}
          <div className="md:col-span-3">
            <h1 className="text-3xl font-bold mb-4">{person.name}</h1>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Biography</h2>
              <p className="text-gray-700 whitespace-pre-line">{person.biography}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Known For</h2>
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400/30 scrollbar-track-transparent">
                {getMovies().length > 0 ? (
                  <div className="flex gap-4 pb-4">
                    {getMovies().map((movie) => (
                      <div key={movie.id} className="flex-none w-[150px]">
                        <Link
                          to={`/movie/${movie.id}`}
                          className="hover:opacity-75 transition-opacity"
                        >
                          <div className="rounded-lg overflow-hidden mb-2">
                            <img
                              src={movie.poster_path
                                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                : defaultMovieImage
                              }
                              alt={movie.title}
                              className={`w-full aspect-[2/3] object-cover ${!movie.poster_path ? 'bg-gray-200 p-8' : ''}`}
                            />
                          </div>
                          <h3 className="font-medium line-clamp-2">{movie.title}</h3>
                          <p className="text-sm text-gray-500">
                            {movie.character ? `as ${movie.character}` : movie.job}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    We don't have any credits for {person.name} yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleDetail; 