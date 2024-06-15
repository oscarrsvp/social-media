import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SlUser } from 'react-icons/sl';
import styles from './FollowingSection.module.css';

function FollowingSection({ userId }) {
  const users = useSelector((state) => state.users);
  const currentFollowing = Object.values(users);

  if (users.users === null) return <h1>Loading...</h1>;

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
