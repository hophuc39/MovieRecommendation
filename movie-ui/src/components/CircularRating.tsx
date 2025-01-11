interface CircularRatingProps {
  rating: number;
  className?: string;
}

const CircularRating = ({ rating, className = '' }: CircularRatingProps) => {
  // Convert rating from 0-10 to percentage
  const percentage = Math.round(rating * 10);

  // Calculate color based on percentage
  const getColor = (value: number) => {
    if (value >= 70) return '#21d07a'; // Green
    if (value >= 40) return '#d2d531'; // Yellow
    return '#db2360'; // Red
  };

  const color = getColor(percentage);
  const circumference = 2 * Math.PI * 20; // r = 20
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg className="w-[50px] h-[50px] transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          strokeWidth="3"
          fill="#081c22"
          stroke="#081c22"
        />
        {/* Progress circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          strokeWidth="3"
          fill="transparent"
          stroke={color}
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 0.3s ease'
          }}
        />
      </svg>
      <span className="absolute text-white font-bold text-sm">
        {percentage}<sup className="text-[8px]">%</sup>
      </span>
    </div>
  );
};

export default CircularRating; 