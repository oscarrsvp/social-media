import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFollowing } from '../../store/followSlice';
import BlankImage from '../../assets/blank-profile-picture.png';
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
          <h3>Following</h3>
          <div className={styles.userSection}>
            {currentFollowing.length === 0 ? (
              <div className={styles.discoverUser}>
                <p>Visit the Explore page to discover new users</p>
                <Link to={'/explore'} className="btn">
                  Explore
                </Link>
              </div>
            ) : null}
            {currentFollowing.map((user) => (
              <div className={styles.user} key={`following${user.id}`}>
                {user.id === userId ? null : (
                  <>
                    {user.profileImage ? (
                      <img className="profileImg" src={user.profileImage} alt="" />
                    ) : (
                      <img src={BlankImage} className={styles.noProfileImg} />
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
