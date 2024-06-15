import { useSelector } from 'react-redux';
import styles from './FollowingSection.module.css';

function FollowingSection({ userId }) {
  const users = useSelector((state) => state.users);
  const currentFollowing = Object.values(users);

  console.log(users, 'ssss');
  console.log(currentFollowing, 'following');

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
                    <img className="profileImg" src={user.profileImage} alt="" />
                    <h3>
                      {user.firstName} {user.lastName}
                    </h3>
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
