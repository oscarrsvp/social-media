import { NavLink } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { formatDate } from '../../utils/globallyFns';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './UserPhotos.module.css';

function PhotoCommentSection({ data }) {
  const { closeModal } = useModal();

  return (
    <div className={styles.comments}>
      <div className={`${styles.commentHeader} flexBetween`}>
        <div className={styles.userImage}>
          {data.profileImage ? (
            <img src={data.profileImage} alt="" />
          ) : (
            <img src={BlankImage} />
          )}
          <NavLink onClick={closeModal} to={`/user/${data.userId}`}>
            {data.name}
          </NavLink>
        </div>
      </div>

      <p className={styles.userComment}>{data.comment}</p>

      <h5>Posted: {formatDate(data.createdAt)}</h5>
    </div>
  );
}

export default PhotoCommentSection;
