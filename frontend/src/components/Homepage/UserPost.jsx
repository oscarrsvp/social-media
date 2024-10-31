import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { useModal } from '../../context/Modal';
import CommentSection from './CommentSection';
import DeletePost from '../PostForm/DeletePost';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdatePost from '../UpdateInputs/UpdatePost';
import PostDetails from './PostDetails';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './Homepage.module.css';

function UserPost({ post, userId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { closeModal } = useModal();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

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

  if (!users) return <h1>Loading</h1>;

  const fullName = users
    ? `${users[userId]?.firstName || ''} ${users[userId]?.lastName || ''}`
    : '';

  const toggleButton = styles.dropdownMenu + (showMenu ? '' : styles.hidden);

  return (
    <>
      <div className={styles.userPost}>
        <div className={`flexBetween p-16 ${styles.userHeading}`}>
          <div className="flexBetween">
            <p className={styles.userImage}>
              {users[userId]?.profileImage ? (
                <img src={users[userId].profileImage} alt="" />
              ) : (
                <img src={BlankImage} />
              )}
            </p>

            <Link to={`/user/${users[userId]?.id}`}>{fullName}</Link>
          </div>
          <div style={{ position: 'relative' }}>
            <BsThreeDotsVertical cursor={'pointer'} size={20} onClick={toggleMenu} />

            {sessionUser.id === post.userId && showMenu && (
              <div className={toggleButton} ref={ulRef}>
                <div className={styles.postMenu}>
                  <OpenModalButton
                    buttonText={
                      <>
                        <VscEdit /> {'Edit Post'}
                      </>
                    }
                    modalComponent={<UpdatePost post={post} />}
                    classNames={styles.postButtons}
                    onButtonClick={() => setShowMenu(false)}
                  />
                  <OpenModalButton
                    buttonText={
                      <>
                        <VscTrash /> {'Delete'}
                      </>
                    }
                    modalComponent={<DeletePost postId={post.id} userId={post.userId} />}
                    classNames={styles.postButtons}
                    onButtonClick={() => setShowMenu(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.postDetails}>
          <PostDetails post={post} fullName={fullName} />
          <CommentSection postId={post.id} postLikes={post.likes} />
        </div>
      </div>
    </>
  );
}

export default UserPost;
