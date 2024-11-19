import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaRegCompass } from 'react-icons/fa';
import { IoPersonOutline } from 'react-icons/io5';
import { MobileContext } from '../../App';
import styles from './AppBar.module.css';

function AppBar() {
  const user = useSelector((state) => state.session.user);
  const isMobile = useContext(MobileContext);

  if (!isMobile || !user) return null;

  return (
    <div className={styles.actionBar}>
      <ul>
        <li>
          <NavLink to="/homepage">
            <AiOutlineHome size={30} />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore">
            <FaRegCompass size={30} />
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink to={`/user/${user.id}`}>
            <IoPersonOutline size={30} />
            User
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AppBar;
