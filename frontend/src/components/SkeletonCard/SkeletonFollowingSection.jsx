import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonFollowingSection() {
  return (
    <div className="skeleton-follow-section">
      <div className="follow-header">
        <Skeleton width={'150px'} />
      </div>

      {Array(2)
        .fill(0)
        .map((_, index) => (
          <div className="following" key={index}>
            <Skeleton circle height={'40px'} width={'40px'} />
            <Skeleton width={'180px'} />
          </div>
        ))}
    </div>
  );
}

export default SkeletonFollowingSection;
