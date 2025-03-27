import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newPhotoComment } from '../../store/photoCommentSlice';
import styles from './UserPhotos.module.css';

function NewPhotoComment({ photoId }) {
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleComment = () => {
    const newComment = dispatch(newPhotoComment({ photoId, context: comment }));

    return newComment.then(async (res) => {
      const data = await res;

      if (data.error) {
        setErrors(data.payload);
      } else {
        setComment('');
      }
    });
  };

  return (
    <div className={styles.HandleComment}>
      <textarea
        type="text"
        value={comment}
        placeholder="Write a comment..."
        onChange={(e) => setComment(e.target.value)}
      />
      {errors.context && <p className="error">{errors.context}</p>}

      {comment.trim() && (
        <button className="btn update-btn" onClick={handleComment}>
          Comment
        </button>
      )}
    </div>
  );
}

export default NewPhotoComment;
