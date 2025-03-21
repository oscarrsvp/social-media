import { NavLink, MemoryRouter } from 'react-router-dom';
import { createdAt } from '../../utils/globallyFns';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './UserPhotos.module.css';

function PhotoCommentSection({ data }) {
  return (
    <div className={styles.comments}>
      <div className={`${styles.commentHeader} flexBetween`}>
        <div className={styles.userImage}>
          {data.profileImage ? (
            <img src={data.profileImage} alt="" />
          ) : (
            <img src={BlankImage} />
          )}
          <MemoryRouter>
            <NavLink to={`/user/${data.userId}`}>{data.name}</NavLink>
          </MemoryRouter>
        </div>
      </div>

      <p className={styles.userComment}>{data.comment}</p>

      <h5>Posted: {createdAt(data.createdAt)}</h5>
    </div>
  );
}

export default PhotoCommentSection;
