import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getLatestTrailers } from "../api/movieApi";

const LatestTrailers = () => {
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedTrailer, setSelectedTrailer] = useState<{
    key: string;
    title: string;
  } | null>(null);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTrailer(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const { data: trailers } = useQuery({
    queryKey: ["latest-trailers"],
    queryFn: async () => {
      try {
        const response = await getLatestTrailers();
        return response;
      } finally {
      }
    }
  });

  const getYoutubeEmbedUrl = (key: string) => {
    return `https://www.youtube.com/embed/${key}?autoplay=1`;
  };

  const handleOpenModal = (key: string, title: string) => {
    setSelectedTrailer({ key, title });
  };

  return (
    <div className="relative">
      {/* Background với overlay gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{
          backgroundImage: `url(${selectedBackground || '/trailer-background.jpg'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-tmdbDarkBlue/90 to-tmdbDarkBlue/70" />
      </div>

      {/* Content */}
      <div className="relative max-w-8xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Latest Trailers</h2>

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <div className="flex gap-4 pb-4">
            {trailers?.map((movie: any) => (
              <div
                key={movie.trailers[0].id}
                className="flex-none w-80 overflow-hidden rounded-lg"
                onMouseEnter={() => setSelectedBackground(`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`)}
              >
                <div
                  className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleOpenModal(movie.trailers[0].key, movie.title)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden shadow-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      alt={movie.trailers[0].name}
                      className="w-full h-full object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-tmdbDarkBlue"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Movie info */}
                  <div className="mt-3 text-white">
                    <h3 className="font-bold text-lg">{movie.title}</h3>
                    <p className="text-sm text-gray-300">Official Trailer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {selectedTrailer && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setSelectedTrailer(null)}
        >
          <div className="w-[90vw] max-w-[900px]">
            <div className="relative pt-[56.25%] bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getYoutubeEmbedUrl(selectedTrailer.key)}
                title={selectedTrailer.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestTrailers; 