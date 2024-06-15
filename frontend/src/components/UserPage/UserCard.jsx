import { useSelector, useDispatch } from 'react-redux';
import { SlUser } from 'react-icons/sl';
// import { updateUser } from '../../store/userSlice';
// import { updateProfileImage } from '../../store/sessionSlice';
import { featureComingSoon } from '../../utils/globallyFns';
import styles from './UserPage.module.css';

function UserCard({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
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
          <button onClick={(e) => featureComingSoon(e)} className="btn">
            Follow
          </button>
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
