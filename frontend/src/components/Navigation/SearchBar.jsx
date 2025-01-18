import { IoSearchOutline } from 'react-icons/io5';

function SearchBar() {
  return (
    <div className="search-section">
      <input type="search" name="search" id="search-bar" />
      <IoSearchOutline className="search-icon" />
    </div>
  );
}

export default SearchBar;
