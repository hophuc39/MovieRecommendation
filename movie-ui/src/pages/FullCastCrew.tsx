import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getMovieDetail } from '../api/movieApi';
import Navbar from '../components/Navbar';
import { Link } from 'react-router';
import ProfileImage from '../components/ProfileImage';

const FullCastCrew = () => {
  const { id } = useParams();

  const { data: movie } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetail(id as string),
    enabled: !!id
  });

  if (!movie) return null;

  // Group crew by department
  const crewByDepartment = movie.credits.crew.reduce((acc: any, person: any) => {
    if (!acc[person.department]) {
      acc[person.department] = [];
    }
    acc[person.department].push(person);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="max-w-8xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <Link
            to={`/movie/${movie.tmdb_id}`}
            className="text-tmdbLightBlue hover:text-tmdbLightBlue/80"
          >
            ← Back to main
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cast */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Cast <span className="text-gray-500">{movie.credits.cast.length}</span>
            </h2>
            <div className="space-y-4">
              {movie.credits.cast.map((person: any) => (
                <div key={person.id} className="flex gap-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    <ProfileImage
                      path={person.profile_path}
                      name={person.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <Link
                      to={`/person/${person.id}`}
                      className="font-bold hover:text-tmdbLightBlue"
                    >
                      {person.name}
                    </Link>
                    <p className="text-sm text-gray-500">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crew */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Crew <span className="text-gray-500">{movie.credits.crew.length}</span>
            </h2>
            <div className="space-y-8">
              {Object.entries(crewByDepartment).map(([department, people]: [string, any]) => (
                <div key={department}>
                  <h3 className="text-xl font-bold mb-4">{department}</h3>
                  <div className="space-y-4">
                    {people.map((person: any) => (
                      <div key={person.id + person.job} className="flex gap-4">
                        <div className="w-16 h-16 flex-shrink-0">
                          <ProfileImage
                            path={person.profile_path}
                            name={person.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <Link
                            to={`/person/${person.id}`}
                            className="font-bold hover:text-tmdbLightBlue"
                          >
                            {person.name}
                          </Link>
                          <p className="text-sm text-gray-500">{person.job}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullCastCrew; 