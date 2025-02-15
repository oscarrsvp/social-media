import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../store/followSlice';
import { uploadPhotoToCloudinary, updateProfileImg } from '../../store/userSlice';
import { updateProfileImage } from '../../store/sessionSlice';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './UserPage.module.css';

function UserCard({ user }) {
  const [isActive, setIsActive] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [profileImage, setProfileImage] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const followingList = useSelector((state) => state.following);
  const fullName = `${user.firstName} ${user.lastName}`;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileImg) return;

    const uploadResponse = await dispatch(
      uploadPhotoToCloudinary({ userId: user.id, url: profileImg, preview: false }),
    );

    if (profileImage) {
      const { id, userId, url } = uploadResponse.payload;
      dispatch(updateProfileImg({ id, userId })).then(() => {
        dispatch(updateProfileImage(url));
        setPreviewImg(null);
      });
    }

    setIsActive(!isActive);
    setProfileImg(null);

    return;
  };

  const handleProfileImg = (e) => {
    const image = e.target.files[0];

    if (!image) return;

    if (image.type === 'image/heic' || image.type === 'image/heif') {
      alert(
        'HEIC files are not supported. Please convert your image to JPEG or PNG before uploading.',
      );
      return;
    }

    setProfileImg(image);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };

    reader.readAsDataURL(image);

    setIsActive(!isActive);
  };

  const resetImg = () => {
    setIsActive(false);
    setProfileImg(null);
    setPreviewImg(null);
  };

  return (
    <div className={styles.userActions}>
      {user.profileImage || previewImg ? (
        <img
          src={!previewImg ? user.profileImage : previewImg}
          alt="user-img"
          className={styles.profileImg}
        />
      ) : (
        <img src={BlankImage} className={styles.profileImg} />
      )}

      <div className={styles.actions}>
        <h2>{fullName}</h2>
        <p>{user.bio}</p>
        {isActive && (
          <>
            <div className={styles.ActionBtn}>
              <button className="btn" onClick={handleSubmit}>
                Add
              </button>
              <button className="btn" onClick={resetImg}>
                Cancel
              </button>
            </div>

            <div className={styles.SetProfileImg}>
              <input
                type="checkbox"
                checked={profileImage}
                onChange={() => setProfileImage((prev) => !prev)}
              />
              <label>Set as Profile Image</label>
            </div>
          </>
        )}

        {sessionUser.id === user.id ? (
          <label htmlFor="image" className={styles.ProfileInput}>
            <input
              type="file"
              name="profileImg"
              id="image"
              onChange={(e) => handleProfileImg(e)}
            />

            {!profileImg && (
              <button className="btn" onClick={(prev) => setIsActive(!prev)}>
                {user.profileImage ? 'Change Picture' : 'Upload Picture'}
              </button>
            )}
          </label>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default UserCard;
