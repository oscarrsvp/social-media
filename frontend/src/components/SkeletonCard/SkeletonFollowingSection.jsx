import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './SkeletonCard.module.css';

function SkeletonFollowingSection() {
  return (
    <div className={styles.skeletonFollowSection}>
      <div className={styles.followHeader}>
        <Skeleton width={'150px'} />
      </div>

      {Array(2)
        .fill(0)
        .map((_, index) => (
          <div className={styles.following} key={index}>
            <Skeleton circle height={'40px'} width={'40px'} />
            <Skeleton width={'180px'} />
          </div>
        ))}
    </div>
  );
}

export default SkeletonFollowingSection;
