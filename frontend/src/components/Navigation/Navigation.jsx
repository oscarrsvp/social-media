import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <>{''}</>
  );

  return (
    <>
      {!sessionUser ? (
        ''
      ) : (
        <nav>
          <div>
            <ul className="navLinks">
              <li>
                <NavLink to="/homepage">Home</NavLink>
              </li>
              {isLoaded && sessionLinks}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navigation;
