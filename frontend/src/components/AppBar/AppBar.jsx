import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaRegCompass } from 'react-icons/fa';
import { IoPersonOutline } from 'react-icons/io5';
import styles from './AppBar.module.css';

function AppBar() {
  const user = useSelector((state) => state.session.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile || !user) return null;

  return (
    <div className={styles.actionBar}>
      <ul>
        <li>
          <Link to="/homepage">
            <AiOutlineHome />
            Home
          </Link>
        </li>
        <li>
          <Link to="/explore">
            <FaRegCompass />
            Explore
          </Link>
        </li>
        <li>
          <Link to={`/user/${user.id}`}>
            <IoPersonOutline />
            User
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AppBar;
