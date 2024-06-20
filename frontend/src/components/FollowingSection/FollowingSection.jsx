import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SlUser } from 'react-icons/sl';
import { fetchFollowing } from '../../store/followSlice';
import styles from './FollowingSection.module.css';

function FollowingSection({ userId }) {
  const following = useSelector((state) => state.following);
  const currentFollowing = Object.values(following);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

  if (following.followingList === null) return <h1>Loading...</h1>;

  return (
    <div className={styles.followingSection}>
      <div>
        <div className={styles.userFollowing}>
          <h2>FOLLOWING</h2>
          <div className={styles.userSection}>
            {currentFollowing.map((user) => (
              <div className={styles.user} key={`following${user.id}`}>
                {user.id === userId ? null : (
                  <>
                    {user.profileImage ? (
                      <img className="profileImg" src={user.profileImage} alt="" />
                    ) : (
                      <SlUser className={styles.noProfileImg} />
                    )}

                    <Link to={`/user/${user.id}`}>
                      {user.firstName} {user.lastName}
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowingSection;
