import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { formatDate } from '../../utils/globallyFns';
import BlankImage from '../../assets/blank-profile-picture.png';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdatePhotoComment from '../UpdateInputs/UpdatePhotoComment';
import styles from './UserPhotos.module.css';

function PhotoCommentSection({ data }) {
  const sessionUser = useSelector((state) => state.session.user);
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const { closeModal } = useModal();

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(id);
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

  const toggleButton = 'dropdownMenu' + (showMenu ? '' : 'hidden');

  return (
    <div className={styles.comments}>
      <div className={`${styles.commentHeader} flexBetween`}>
        <div className={styles.userImage}>
          {data.profileImage ? (
            <img src={data.profileImage} alt="" />
          ) : (
            <img src={BlankImage} />
          )}
          <NavLink onClick={closeModal} to={`/user/${data.userId}`}>
            {data.fullName}
          </NavLink>
        </div>

        {sessionUser.id === data.userId && (
          <div style={{ position: 'relative' }}>
            <BsThreeDotsVertical
              cursor={'pointer'}
              onClick={(e) => toggleMenu(e, data.id)}
            />

            {showMenu && data.id === openMenuId && (
              <div className={toggleButton} ref={ulRef}>
                <div className="postMenu">
                  <OpenModalButton
                    buttonText={
                      <>
                        <VscEdit /> {'Edit Comment'}
                      </>
                    }
                    modalComponent={<UpdatePhotoComment comment={data} />}
                    classNames="postButtons"
                    onButtonClick={() => setShowMenu(false)}
                  />

                  <OpenModalButton
                    buttonText={
                      <>
                        <VscTrash /> {'Delete'}
                      </>
                    }
                    classNames="postButtons"
                    onButtonClick={() => setShowMenu(false)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <p className={styles.userComment}>{data.context}</p>

      <small>Posted: {formatDate(data.createdAt)}</small>
    </div>
  );
}

export default PhotoCommentSection;
