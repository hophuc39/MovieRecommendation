import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import { getPeople } from '../api/movieApi';
import { Link } from 'react-router';
import Footer from '../components/Footer';

const PeopleList = () => {
  const [page, setPage] = useState(1);

  const { data: people, isLoading } = useQuery({
    queryKey: ['people', page],
    queryFn: () => getPeople({ page })
  });

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex flex-col">
        <div className="flex-grow max-w-8xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Popular People</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-tmdbLightBlue"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {people?.items.map((person: any) => (
                  <Link
                    key={person.id}
                    to={`/person/${person.tmdb_id}`}
                    className="group"
                  >
                    <div className="rounded-lg overflow-hidden mb-4 bg-gray-200">
                      <img
                        src={person.profile_path
                          ? `https://image.tmdb.org/t/p/w235_and_h235_face${person.profile_path}`
                          : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                        }
                        alt={person.name}
                        className={`w-full aspect-square object-cover transform transition duration-300 group-hover:scale-105
                          ${!person.profile_path ? 'p-8 object-contain' : ''}`}
                      />
                    </div>
                    <h2 className="font-bold text-base group-hover:text-tmdbLightBlue transition-colors duration-200">
                      {person.name}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {person.known_for?.map((movie: any) => movie.title).join(', ')}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {page} of {Math.ceil((people?.total || 0) / 20)}
                  </span>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= Math.ceil((people?.total || 0) / 20)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PeopleList; 