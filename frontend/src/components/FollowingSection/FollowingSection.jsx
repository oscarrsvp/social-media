import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFollowing } from '../../store/followSlice';
import SkeletonFollowingSection from '../SkeletonCard/SkeletonFollowingSection';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './FollowingSection.module.css';

function FollowingSection({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const following = useSelector((state) => state.following);
  const currentFollowing = Object.values(following);
  const displayUsers = showAllUsers ? currentFollowing : currentFollowing.slice(0, 4);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowing()).then(() => setIsLoading(false));
  }, [dispatch]);

  if (following.followingList === null) return isLoading && <SkeletonFollowingSection />;

  return (
    <div className={styles.followingSection}>
      <div>
        <div className={styles.userFollowing}>
          <h3>Following</h3>
          <div className={styles.userSection}>
            {displayUsers.length === 0 ? (
              <div className={styles.discoverUser}>
                <p>Visit the Explore page to discover new users</p>
                <Link to={'/explore'} className="btn">
                  Explore
                </Link>
              </div>
            ) : null}
            {displayUsers.map((user) => (
              <Link to={`/user/${user.id}`} key={`following${user.id}`}>
                <div className={styles.user}>
                  {user.id === userId ? null : (
                    <div>
                      {user.profileImage ? (
                        <img className="profileImg" src={user.profileImage} alt="" />
                      ) : (
                        <img src={BlankImage} className={styles.noProfileImg} />
                      )}
                      {user.firstName} {user.lastName}
                    </div>
                  )}
                  {user.bio ? <small>{user.bio}</small> : null}
                </div>
              </Link>
            ))}
            {currentFollowing.length > 4 && !showAllUsers && (
              <span onClick={() => setShowAllUsers(true)}>View All</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowingSection;
