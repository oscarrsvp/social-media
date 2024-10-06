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

        {<h5>Posted: {createdAt(post.createdAt)}</h5>}
      </div>
    </div>
  );
}

export default PostDetails;
