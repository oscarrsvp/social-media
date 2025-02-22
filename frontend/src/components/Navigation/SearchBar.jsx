import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { searchUsers } from '../../store/searchBarSlice';

function SearchBar() {
  const searchResults = useSelector((state) => state.searchResults);
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(true);
  const results = Object.values(searchResults);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    dispatch(searchUsers(searchValue));
    setShowResults(true);

    if (searchValue.trim() === '') {
      dispatch(searchUsers(null));
    } else {
      dispatch(searchUsers(searchValue));
    }
  };

  return (
    <div className="search-input">
      <div className="search-section">
        <input
          type="text"
          name="search"
          id="search-bar"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for a user..."
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        <IoSearchOutline className="search-icon" />
      </div>

      {showResults && searchResults.search !== null && results.length !== 0 && (
        <div className="search-results">
          {results.map((users) => (
            <Link
              to={`/user/${users?.id}`}
              onClick={() => setShowResults(false)}
              key={`user${users?.id}`}
            >
              <div className="search-results-users">
                <img src={users?.profileImg} alt="" className="profile-picture" />

                <span>
                  {users?.firstName} {users?.lastName}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
