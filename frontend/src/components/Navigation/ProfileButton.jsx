import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BlankImage from '../../assets/blank-profile-picture.png';
import { removeUser } from '../../store/sessionSlice';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(removeUser());
    return navigate('/', { replace: true });
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

  return (
    <>
      {user.profileImage ? (
        <img
          onClick={toggleMenu}
          className="profile-picture"
          src={`${user.profileImage}`}
          alt=""
        />
      ) : (
        <img src={BlankImage} className="profile-picture" onClick={toggleMenu} />
      )}

      <ul className={ulClassName} ref={ulRef}>
        <li>
          Name: {user.firstName} {user.lastName}
        </li>
        <li>Email: {user.email}</li>
        <li>
          <button className="btn delete-btn" onClick={logout}>
            Log Out
          </button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
