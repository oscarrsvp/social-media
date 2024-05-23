import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineHome } from 'react-icons/ai';
import { IoPersonOutline, IoSettingsOutline } from 'react-icons/io5';
import { FaRegEnvelope, FaRegCompass } from 'react-icons/fa';
import { SlUser } from 'react-icons/sl';
import { featureComingSoon } from '../../utils/globallyFns';
import styles from './Sidebar.module.css';

function Sidebar() {
  const user = useSelector((state) => state.session.user);

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarUser}>
        {user.profileImage ? (
          <img src={user.profileImage} alt="" />
        ) : (
          <SlUser size={65} className="default-picture" />
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
          <NavLink
            to={' '}
            onClick={(e) => featureComingSoon(e)}
            className={({ isActive }) => [isActive ? 'active' : '']}
          >
            <FaRegCompass /> Explore
          </NavLink>
        </li>

        <li>
          <NavLink to={' '} onClick={(e) => featureComingSoon(e)}>
            <FaRegEnvelope /> Messages
          </NavLink>
        </li>
      </ul>

      <div className={styles.divider}></div>
      <ul className={styles.sideLinks}>
        <li>
          <h4>Account</h4>
        </li>
        <li>
          <NavLink to={' '} onClick={(e) => featureComingSoon(e)}>
            <IoSettingsOutline /> Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
