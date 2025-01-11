import { useSelector } from 'react-redux';
import styles from './UserPhotos.module.css';

function UserPhotos() {
  const userPhotos = useSelector((state) => state.userPhotos);
  const firstName = useSelector((state) => state.session.user.firstName);
  const photos = Object.values(userPhotos);

  return (
    <div id={styles.userPhotosSection}>
      {photos.length === 0 ? (
        <div className="noContent">
          <h1>{firstName} doesn&apos;t have any photos</h1>
        </div>
      ) : (
        <>
          <h2>Photos</h2>
          <div className={styles.userPictures}>
            {photos.map((photo) => (
              <img src={photo?.url} key={photo?.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserPhotos;
