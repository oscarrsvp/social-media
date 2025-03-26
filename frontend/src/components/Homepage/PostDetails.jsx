import { createdAt } from '../../utils/globallyFns';
import styles from './Homepage.module.css';

function PostDetails({ post, fullName }) {
  const postImage = !post.photo ? '' : post.photo;

  return (
    <div className={styles.userDetails}>
      {postImage && <img src={post.photo} alt="post-image" />}

      <div className={styles.postDescription}>
        <p>
          {postImage && <span>{fullName}</span>}
          {post.context}
        </p>

        <small>Posted: {createdAt(post.createdAt)}</small>
      </div>
    </div>
  );
}

export default PostDetails;
