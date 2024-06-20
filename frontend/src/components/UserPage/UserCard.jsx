import { useSelector, useDispatch } from 'react-redux';
import { SlUser } from 'react-icons/sl';
import { followUser, unfollowUser } from '../../store/followSlice';
// import { updateUser } from '../../store/userSlice';
// import { updateProfileImage } from '../../store/sessionSlice';
import { featureComingSoon } from '../../utils/globallyFns';
import styles from './UserPage.module.css';

function UserCard({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const followingList = useSelector((state) => state.following);
  const fullName = `${user.firstName} ${user.lastName}`;
  const dispatch = useDispatch();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   dispatch(updateProfileImage(profileImg));

  //   return dispatch(updateUser({ profileImage: profileImg }));
  // };

  return (
    <div className={styles.userActions}>
      <div>
        {user.profileImage ? (
          <img src={user.profileImage} alt="" className={styles.profileImg} />
        ) : (
          <SlUser size={150} />
        )}
      </div>
      <div className={styles.actions}>
        <h2>{fullName}</h2>
        <p>Message</p>
        <p>Photos</p>
      </div>

      {sessionUser.id !== user.id ? (
        <div>
          {followingList[user.id] ? (
            <button className="btn" onClick={() => dispatch(unfollowUser(user.id))}>
              Unfollow
            </button>
          ) : (
            <button className="btn" onClick={() => dispatch(followUser(user.id))}>
              Follow
            </button>
          )}
        </div>
      ) : (
        <button className="btn" onClick={(e) => featureComingSoon(e)}>
          Upload Picture
        </button>
      )}
    </div>
  );
}

export default UserCard;
