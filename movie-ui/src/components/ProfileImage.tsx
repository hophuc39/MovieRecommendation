interface ProfileImageProps {
  path: string | null;
  name: string;
  className?: string;
  type?: 'tmdbPath' | 'otherPath' | 'mixedPath';
}

const ProfileImage = ({ type, path, name, className = '' }: ProfileImageProps) => {
  const defaultImageUrl = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';
  let imageUrl = defaultImageUrl;

  if (!path) {
    return <img src={defaultImageUrl} alt={name} className={className} />;
  }

  switch (type) {
    case "tmdbPath":
      imageUrl = `https://image.tmdb.org/t/p/w200${path}`;
      break;
    case "otherPath":
      imageUrl = path;
      break;
    case "mixedPath":
      imageUrl = path.startsWith("/") ? `https://image.tmdb.org/t/p/w200${path}` : path;
      break;
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      className={`${className} ${!path ? 'bg-gray-200 p-2' : ''}`}
    />
  );
};

export default ProfileImage; 