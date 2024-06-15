import { useState } from 'react';
import { createdAt } from '../../utils/globallyFns';
import styles from './Homepage.module.css';

function PostDetails({ post, fullName }) {
  const postImage = !post.photo ? '' : post.photo;
  const [fullImage, setFullImage] = useState(false);

  const toggleImage = fullImage ? styles.fullImage : styles.postImage;

  return (
    <div className={styles.userDetails}>
      {postImage ? (
        <>
          <div onClick={() => setFullImage(!fullImage)}>
            <img src={post.photo} className={toggleImage} />
          </div>
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
