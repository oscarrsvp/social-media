import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { createComment, deleteComment } from '../../store/commentSlice';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdateComment from '../UpdateInputs/UpdateComment';
import styles from './Homepage.module.css';

function CommentSection({ post, comments }) {
  const postId = post.id;
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
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

      {showComments && (
        <div className={styles.commentSection}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.postComments}>
              <div className="flexBetween">
                <div className="flexBetween">
                  <p className={styles.userImage}></p>
                  <h4>{comment.fullName}</h4>
                </div>
                <h5>Posted: {comment.createdAt}</h5>
              </div>
              <p className={styles.comments}>{comment.context}</p>
              {sessionUser.id === comment.userId && (
                <div>
                  <OpenModalButton
                    buttonText="Edit Comment"
                    modalComponent={<UpdateComment comment={comment} />}
                  />
                  <button
                    onClick={() => dispatch(deleteComment({ postId, id: comment.id }))}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
