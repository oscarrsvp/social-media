import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHome } from 'react-icons/ai';
import { IoPersonOutline, IoSettingsOutline } from 'react-icons/io5';
import { FaRegCompass } from 'react-icons/fa';
// import {FaRegEnvelope} from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { removeUser } from '../../store/sessionSlice';
import BlankImage from '../../assets/blank-profile-picture.png';
import styles from './Sidebar.module.css';

function Sidebar() {
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!user) return null;

  const logout = (e) => {
    e.preventDefault();
    dispatch(removeUser());
    return navigate('/', { replace: true });
  };

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarUser}>
        {user.profileImage ? (
          <img src={user.profileImage} alt="" />
        ) : (
          <img src={BlankImage} className="default-picture" />
        )}

        <h1>{fullName}</h1>
      </div>

      <ul className={styles.sideLinks}>
        <li>
          <NavLink to="/homepage">
            <AiOutlineHome /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to={`/user/${user.id}`}>
            <IoPersonOutline /> Profile
          </NavLink>
        </li>

        <li>
          <NavLink to={'/explore'}>
            <FaRegCompass /> Explore
          </NavLink>
        </li>

        {/* <li>
          <NavLink to={' '} onClick={(e) => featureComingSoon(e)}>
            <FaRegEnvelope /> Messages
          </NavLink>
        </li> */}
      </ul>

      <div className={styles.divider}></div>
      <ul className={styles.sideLinks}>
        <li>
          <h4>Account</h4>
        </li>
        <li>
          <NavLink to="/settings">
            <IoSettingsOutline /> Settings
          </NavLink>
        </li>
        <li>
          <NavLink to={' '} onClick={logout}>
            <LuLogOut /> Log Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
