import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
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
                <Link to="/homepage">Home</Link>
              </li>
              <li>
                <SearchBar />
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
