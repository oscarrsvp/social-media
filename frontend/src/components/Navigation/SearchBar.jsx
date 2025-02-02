import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { searchUsers } from '../../store/searchBarSlice';

function SearchBar() {
  const searchResults = useSelector((state) => state.searchResults);
  const [search, setSearch] = useState('');
  const results = Object.values(searchResults);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    dispatch(searchUsers(searchValue));

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
          type="search"
          name="search"
          id="search-bar"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for a user..."
        />
        <IoSearchOutline className="search-icon" />
      </div>

      {searchResults.search !== null && results.length !== 0 && (
        <div className="search-results">
          {results.map((users) => (
            <div key={`user${users?.id}`} className="search-results-users">
              <img src={users?.profileImg} alt="" className="profile-picture" />
              <Link to={`/user/${users?.id}`}>
                {users?.firstName} {users?.lastName}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
