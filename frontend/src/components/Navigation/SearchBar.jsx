import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
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
    <>
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

      {searchResults.search !== null && results !== 0 && (
        <div>
          {results.map((users) => (
            <div key={`user${users?.id}`}>
              <img src={users?.profileImg} alt="" />
              <h1>
                {users?.firstName} {users?.lastName}
              </h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchBar;
