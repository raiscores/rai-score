import { Star, StarHalf } from 'lucide-react';

const filledYellow = { color: '#d97706', fill: '#d97706' };   // amber-600 (rich gold)
const outlinedGray = { color: '#d1d5db', fill: 'none' };      // gray-300

const starContainerStyle = {
  position: 'relative',
  width: '24px',
  height: '24px',
  display: 'inline-block',
};

const outlinedStarStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  color: '#d1d5db',
  fill: 'none',
  zIndex: 1,
};

const filledHalfStarStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  color: '#d97706',
  fill: '#d97706',
  zIndex: 2,
};

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        if (i + 1 <= Math.floor(rating)) {
          // Full star (filled yellow)
          return (
            <Star key={i} className="w-6 h-6" style={filledYellow} />
          );
        } else if (rating - i >= 0.5) {
          // Half star: overlay yellow half on gray outline
          return (
            <span key={i} style={starContainerStyle}>
              <Star className="w-6 h-6" style={outlinedStarStyle} />
              <StarHalf className="w-6 h-6" style={filledHalfStarStyle} />
            </span>
          );
        } else {
          // Empty star (gray outline)
          return (
            <Star key={i} className="w-6 h-6" style={outlinedGray} />
          );
        }
      })}
    </div>
  );
};

export default StarRating;