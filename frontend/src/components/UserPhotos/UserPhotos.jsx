import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserPhotos } from '../../store/userPhotosSlice';
import styles from './UserPhotos.module.css';

function UserPhotos() {
  const userPhotos = useSelector((state) => state.userPhotos);
  const sessionUser = useSelector((state) => state.session.user);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const photos = Object.values(userPhotos);
  const dispatch = useDispatch();

  const displayedPhotos = showAllPhotos ? photos : photos.slice(0, 3);

  const deletePhoto = (id) => {
    dispatch(deleteUserPhotos(id));
  };

  return (
    <div id={styles.userPhotosSection}>
      {photos.length === 0 ? (
        <div className="noContent">
          <h1>{sessionUser.firstName} doesn&apos;t have any photos</h1>
        </div>
      ) : (
        <>
          <div className={styles.photoSection}>
            <h2>Photos</h2>
            {photos.length > 3 && !showAllPhotos && (
              <span onClick={() => setShowAllPhotos(true)}>See all photos</span>
            )}
          </div>
          <div className={styles.userPictures}>
            {displayedPhotos.map((photo) => (
              <div className={styles.userPhoto} key={`photos${photo.id}`}>
                <img src={photo?.url} key={photo?.id} />
                {sessionUser.id === photo.userId && (
                  <button
                    className="delete-btn btn"
                    onClick={() => deletePhoto(photo.id)}
                  >
                    Remove photo
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserPhotos;
