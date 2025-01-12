import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMovieReview } from '../api/movieApi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseSetup';
import { toast } from 'react-toastify';

interface ReviewFormProps {
  movieId: string;
  onClose: () => void;
}

const ReviewForm = ({ movieId, onClose }: ReviewFormProps) => {
  const [user] = useAuthState(auth);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { content: string; rating: number }) =>
      createMovieReview(movieId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie', movieId] });
      toast.success('Review added successfully');
      onClose();
    },
    onError: () => {
      toast.error('Failed to add review');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add a review');
      return;
    }
    mutate({ content, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-tmdbLightBlue focus:border-transparent"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Your Review</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-tmdbLightBlue focus:border-transparent"
          placeholder="Write your review here..."
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-tmdbLightBlue text-white rounded hover:bg-tmdbLightBlue/90 disabled:opacity-50"
        >
          {isPending ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm; 