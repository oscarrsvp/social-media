import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonCard({ length }) {
  return Array(length)
    .fill(0)
    .map((_, index) => (
      <div className="skeleton-card" key={index}>
        <div className="post-header">
          <Skeleton circle height={'40px'} width={'40px'} />
          <Skeleton width={'150px'} />
        </div>
        <div className="post-details">
          <Skeleton count={3} />
        </div>

        <div className="comment-section">
          <Skeleton circle height={'30px'} width={'30px'} />
          <Skeleton height={'60px'} width={'680px'} />
        </div>
      </div>
    ));
}

export default SkeletonCard;
