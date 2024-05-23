import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../store/commentSlice';
import { createdAt } from '../../utils/globallyFns';
import { SlUser } from 'react-icons/sl';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdateComment from '../UpdateInputs/UpdateComment';
import DeleteComment from '../PostForm/DeleteComment';
import styles from './Homepage.module.css';

function Comments({ postId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const comment = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  if (!comment[postId]) return null;

  const postComments = Object.values(comment[postId]);

  return (
    <div key={postId} className={styles.commentSection}>
      {postComments.length ? (
        postComments.map((comment) => (
          <div key={comment.id} className={styles.postComments}>
            <div className="flexBetween">
              <div className="flexBetween">
                <p className={styles.userImage}>
                  {comment.profileImg ? (
                    <img src={comment.profileImg} alt="" />
                  ) : (
                    <SlUser size={20} display={'flex'} />
                  )}
                </p>
                <NavLink to={`/user/${comment.userId}`}>{comment.fullName}</NavLink>
              </div>
              <h5>Posted: {createdAt(comment.createdAt)}</h5>
            </div>

            <p className={styles.comments}>{comment.context}</p>

            {sessionUser.id === comment.userId && (
              <div>
                <OpenModalButton
                  buttonText={'Edit'}
                  modalComponent={<UpdateComment comment={comment} />}
                  classNames={'btn update-btn'}
                />

                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteComment
                      commentId={comment.id}
                      postId={comment.postId}
                      userId={comment.userId}
                    />
                  }
                  classNames={'btn delete-btn'}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
}

export default Comments;
