import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../store/followSlice';
import { updateUser } from '../../store/userSlice';
import { updateProfileImage } from '../../store/sessionSlice';
import styles from './UserPage.module.css';

function UserCard({ user }) {
  const [isActive, setIsActive] = useState(false);
  const [profileImg, setProfileImg] = useState('' || user.profileImage);
  const sessionUser = useSelector((state) => state.session.user);
  const followingList = useSelector((state) => state.following);
  const fullName = `${user.firstName} ${user.lastName}`;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = user;

    dispatch(updateProfileImage(profileImg));
    dispatch(updateUser({ profileImage: profileImg, firstName, lastName }));
    setIsActive(!isActive);
    return;
  };

  return (
    <div className={styles.userActions}>
      <div className={styles.actions}>
        <h2>{fullName}</h2>
        {isActive ? (
          <>
            <input
              type="text"
              name="profileImg"
              id="profileImg"
              value={profileImg}
              placeholder="Enter Image URL"
              onChange={(e) => setProfileImg(e.target.value)}
            />
          </>
        ) : null}

        {sessionUser.id !== user.id ? (
          <>
            {followingList[user.id] ? (
              <button className="btn" onClick={() => dispatch(unfollowUser(user.id))}>
                Unfollow
              </button>
            ) : (
              <button className="btn" onClick={() => dispatch(followUser(user.id))}>
                Follow
              </button>
            )}
          </>
        ) : (
          <>
            {isActive ? (
              <div>
                <button className="btn" onClick={(e) => handleSubmit(e)}>
                  Edit Picture
                </button>

                <button className="btn" onClick={() => setIsActive((prev) => !prev)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="btn" onClick={() => setIsActive((prev) => !prev)}>
                {user.profileImage ? 'Change Picture' : 'Upload Picture'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserCard;
