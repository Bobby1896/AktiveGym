import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/auth/SearchInput.scss"

const SearchInput = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="custom-search-bar">
        <FaSearch className="search-icon"/>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
