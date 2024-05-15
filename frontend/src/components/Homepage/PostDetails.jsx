import { createdAt } from '../../utils/globallyFns';
import styles from './Homepage.module.css';

function PostDetails({ post, fullName }) {
  const postImage = !post.photo ? '' : post.photo;
  return (
    <div className={styles.userDetails}>
      {postImage ? (
        <>
          <img src={post.photo} />
          <p>
            <span>{fullName}</span>
            {post.context}
          </p>
        </>
      ) : (
        <p>{post.context}</p>
      )}

      {<h5>Posted: {createdAt(post.createdAt)}</h5>}
    </div>
  );
}

export default PostDetails;
