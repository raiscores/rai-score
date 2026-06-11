import { Star, StarHalf } from 'lucide-react';

const GOLD = '#d97706'; // amber-600 (rich gold, Morningstar feel)
const GRAY = '#d1d5db'; // gray-300

/**
 * 5-star rating display. `size` is the star edge in pixels (default 24).
 */
const StarRating = ({ rating = 0, size = 24 }) => {
  const dims = { width: size, height: size };

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        if (i + 1 <= Math.floor(rating)) {
          // Full star (filled gold)
          return (
            <Star key={i} style={{ ...dims, color: GOLD, fill: GOLD }} />
          );
        } else if (rating - i >= 0.5) {
          // Half star: overlay gold half on gray outline
          return (
            <span key={i} style={{ position: 'relative', display: 'inline-block', ...dims }}>
              <Star
                style={{ position: 'absolute', left: 0, top: 0, zIndex: 1, color: GRAY, fill: 'none', ...dims }}
              />
              <StarHalf
                style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, color: GOLD, fill: GOLD, ...dims }}
              />
            </span>
          );
        } else {
          // Empty star (gray outline)
          return (
            <Star key={i} style={{ ...dims, color: GRAY, fill: 'none' }} />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
