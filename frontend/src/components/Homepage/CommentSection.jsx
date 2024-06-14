import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { createComment } from '../../store/commentSlice';
import { featureComingSoon } from '../../utils/globallyFns';
import { likePost, dislikePost } from '../../store/postSlice';
import Comments from './Comments';
import styles from './Homepage.module.css';

function CommentSection({ postId, postLikes }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleComment = () => {
    const newComment = dispatch(createComment({ context: comment, postId }));

    return newComment.then(async (res) => {
      const data = await res;

      if (data.error) {
        setErrors(data.payload);
      } else {
        setComment('');
        setNewComment(!newComment);
        if (showComments) return;
        setShowComments(!showComments);
      }
    });
  };

  return (
    <div>
      <div className="flexBetween">
        <div className="flex">
          <div className="flex">
            {postLikes[sessionUser.id] ? (
              <AiFillHeart
                cursor={'pointer'}
                fill={'red'}
                size={20}
                onClick={() => dispatch(dislikePost({ postId, userId: sessionUser.id }))}
              />
            ) : (
              <AiOutlineHeart
                cursor={'pointer'}
                size={20}
                onClick={() => dispatch(likePost(postId))}
              />
            )}

            <span className="icons" onClick={(e) => featureComingSoon(e)}>
              Like
            </span>
          </div>
          <div className="flex" onClick={() => setNewComment(!newComment)}>
            <FaRegComment cursor={'pointer'} size={20} />
            <span className="icons">Comment</span>
          </div>
        </div>

        <p className="viewComments" onClick={() => setShowComments(!showComments)}>
          {!showComments ? `View comments` : 'Hide Comments'}
        </p>
      </div>

      {newComment && (
        <div className={styles.newComment}>
          <textarea
            type="text"
            value={comment}
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          {errors.context && <p className="error">{errors.context}</p>}
          <button className="btn update-btn" onClick={handleComment}>
            Comment
          </button>
        </div>
      )}

      {showComments && <Comments postId={postId} />}
    </div>
  );
}

export default CommentSection;
