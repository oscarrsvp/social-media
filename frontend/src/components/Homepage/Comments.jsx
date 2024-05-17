import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, fetchComments } from '../../store/commentSlice';
import { createdAt } from '../../utils/globallyFns';
import { SlUser } from 'react-icons/sl';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdateComment from '../UpdateInputs/UpdateComment';
import styles from './Homepage.module.css';

function Comments({ postId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const comment = useSelector((state) => state.comments);
  const user = useSelector((state) => state.users);
  const postComments = Object.values(comment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  if (comment.comments === null) return null;

  return (
    <div key={postId} className={styles.commentSection}>
      {postComments.map((comment) => (
        <div key={comment?.id} className={styles.postComments}>
          <div className="flexBetween">
            <div className="flexBetween">
              <p className={styles.userImage}>
                {user[comment?.userId]?.UserPhotos.length > 0 ? (
                  <img src={user[comment?.userId].UserPhotos[0]?.url} alt="" />
                ) : (
                  <SlUser size={20} display={'flex'} />
                )}
              </p>
              <NavLink to={`/user/${comment.userId}`}>{comment?.fullName}</NavLink>
            </div>
            <h5>Posted: {createdAt(comment?.createdAt)}</h5>
          </div>

          <p className={styles.comments}>{comment?.context}</p>

          {sessionUser.id === comment?.userId && (
            <div>
              <OpenModalButton
                buttonText="Edit Comment"
                modalComponent={<UpdateComment comment={comment} />}
                classNames={'btn update-btn'}
              />
              <button
                className="btn delete-btn"
                onClick={() => dispatch(deleteComment({ id: comment?.id }))}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;
