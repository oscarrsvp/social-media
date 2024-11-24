import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { fetchComments } from '../../store/commentSlice';
import { createdAt } from '../../utils/globallyFns';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdateComment from '../UpdateInputs/UpdateComment';
import DeleteComment from '../PostForm/DeleteComment';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './Homepage.module.css';

function Comments({ postId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const comment = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (e, commentId) => {
    e.stopPropagation();
    setOpenMenuId(commentId);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  if (!comment[postId]) return null;

  const toggleButton = styles.dropdownMenu + (showMenu ? '' : styles.hidden);

  const postComments = Object.values(comment[postId]);

  return (
    <div key={postId} className={styles.commentSection}>
      {postComments.length ? (
        postComments.map((comment) => (
          <div key={comment.id} className={styles.postComments}>
            <div className={`${styles.commentHeader} flexBetween`}>
              <div className="flexBetween">
                <p className={styles.userImage}>
                  {comment.profileImg ? (
                    <img src={comment.profileImg} alt="" />
                  ) : (
                    <img src={BlankImage} />
                  )}
                </p>
                <NavLink to={`/user/${comment.userId}`}>{comment.fullName}</NavLink>
              </div>

              {sessionUser.id === comment.userId && (
                <div style={{ position: 'relative' }}>
                  <BsThreeDotsVertical
                    cursor={'pointer'}
                    onClick={(e) => toggleMenu(e, comment.id)}
                  />

                  {showMenu && comment.id === openMenuId && (
                    <div className={toggleButton} ref={ulRef}>
                      <div className={styles.postMenu}>
                        <OpenModalButton
                          buttonText={
                            <>
                              <VscEdit /> {'Edit Comment'}
                            </>
                          }
                          modalComponent={<UpdateComment comment={comment} />}
                          classNames={styles.postButtons}
                          onButtonClick={() => setShowMenu(false)}
                        />

                        <OpenModalButton
                          buttonText={
                            <>
                              <VscTrash /> {'Delete'}
                            </>
                          }
                          modalComponent={
                            <DeleteComment
                              commentId={comment.id}
                              postId={comment.postId}
                              userId={comment.userId}
                            />
                          }
                          classNames={styles.postButtons}
                          onButtonClick={() => setShowMenu(false)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <p className={styles.comments}>{comment.context}</p>

              <h5>Posted: {createdAt(comment.createdAt)}</h5>
            </div>
          </div>
        ))
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
}

export default Comments;
