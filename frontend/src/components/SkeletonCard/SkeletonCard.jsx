import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './SkeletonCard.module.css';

function SkeletonCard({ length }) {
  return Array(length)
    .fill(0)
    .map((_, index) => (
      <div className={styles.skeletonCard} key={index}>
        <div className={styles.postHeader}>
          <Skeleton circle height={'40px'} width={'40px'} />
          <Skeleton width={'150px'} />
        </div>
        <div className={styles.postDetails}>
          <Skeleton count={3} />
        </div>

        <div className={styles.commentSection}>
          <Skeleton circle height={'30px'} width={'30px'} />
          <Skeleton height={'60px'} width={'680px'} />
        </div>
      </div>
    ));
}

export default SkeletonCard;
