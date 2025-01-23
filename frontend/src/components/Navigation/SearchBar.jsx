import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { searchUsers } from '../../store/userSlice';

function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    dispatch(searchUsers(searchValue));
  };

  return (
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
  );
}

export default SearchBar;
