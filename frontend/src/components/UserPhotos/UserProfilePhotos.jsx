import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { VscChromeClose } from 'react-icons/vsc';
import { fetchPhotoData } from '../../store/photoCommentSlice';
import { formatDate } from '../../utils/globallyFns';
import PhotoCommentSection from './photoCommentSection';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './UserPhotos.module.css';

function UserProfilePhotos({ photo }) {
  const { closeModal } = useModal();
  const photosComments = useSelector((state) => state.photoComments);
  const userProfile = useSelector((state) => state.users[photo?.userId]);
  const photoData = Object.values(photosComments[photo?.id] || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotoData(photo?.id));
  }, [dispatch, photo?.id]);

  if (!photoData === null) return <h1>Loading....</h1>;

  return (
    <div className={styles.userProfileSingle}>
      <VscChromeClose onClick={closeModal} className={styles.closeIcon} size={25} />
      <div className={styles.singlePhoto}>
        <img src={photo.url} alt="" />
        <div className={styles.commentSection}>
          <div className={styles.header}>
            <div className={styles.userImage}>
              {userProfile.profileImage ? (
                <img src={userProfile.profileImage} alt="" />
              ) : (
                <img src={BlankImage} />
              )}

              <NavLink to={`/user/${userProfile.id}`}>
                {userProfile.firstName} {userProfile.lastName}
              </NavLink>
            </div>

            <p>Posted: {formatDate(userProfile.createdAt)}</p>
          </div>

          {photoData.length > 1 ? (
            <div className={styles.userComments}>
              {photoData.map((comments) => (
                <PhotoCommentSection
                  data={comments}
                  key={`userComments-${comments.userId}`}
                />
              ))}
            </div>
          ) : (
            <p className={styles.noComments}>Be the first to leave a comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfilePhotos;
