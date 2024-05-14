import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { createComment } from '../../store/commentSlice';
import Comments from './Comments';
import styles from './Homepage.module.css';

function CommentSection({ post, comments }) {
  const postId = post.id;
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const dispatch = useDispatch();

  const handleComment = () => {
    if (comment.length === 0) return alert('Please provide a value');

    dispatch(createComment({ context: comment, postId }));
    setComment('');
    setNewComment(!newComment);
    setShowComments(!showComments);
  };

  return (
    <div>
      {newComment && (
        <div className={styles.newComment}>
          <textarea
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleComment}>Add new comment</button>
        </div>
      )}

      <div className="flexBetween">
        <div>
          <AiOutlineLike cursor={'pointer'} size={20} className="icons" />
          <FaRegComment
            cursor={'pointer'}
            size={20}
            onClick={() => setNewComment(!newComment)}
          />
        </div>

        <p className="viewComments" onClick={() => setShowComments(!showComments)}>
          {!showComments ? `View all ${post.numOfComments} comments` : 'Hide Comments'}
        </p>
      </div>

      {showComments && <Comments comments={comments} postId={postId} />}
    </div>
  );
}

export default CommentSection;
