import { useState } from 'react';
import { TextField } from "@radix-ui/themes";

interface SearchContainerProps {
  isOpen: boolean;
}

const SearchContainer = ({ isOpen }: SearchContainerProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 right-0 bg-white shadow-lg z-40 border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 py-4">
        <div className="mx-auto">
          <TextField.Root
            placeholder="Search for a movie, tv show, person......"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '46px',
              border: 'none',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
