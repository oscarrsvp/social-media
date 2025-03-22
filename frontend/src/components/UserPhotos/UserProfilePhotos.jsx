import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { VscChromeClose } from 'react-icons/vsc';
import { fetchPhotoData } from '../../store/photoCommentSlice';
import PhotoCommentSection from './photoCommentSection';
import styles from './UserPhotos.module.css';

function UserProfilePhotos({ photo }) {
  const { closeModal } = useModal();
  const photosComments = useSelector((state) => state.photoComments);
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
        {photoData.length > 1 ? (
          <div className={styles.commentSection}>
            {photoData.map((comments) => (
              <PhotoCommentSection
                data={comments}
                key={`userComments-${comments.userId}`}
              />
            ))}
          </div>
        ) : (
          <p>No Comments yet...</p>
        )}
      </div>
    </div>
  );
}

export default UserProfilePhotos;
