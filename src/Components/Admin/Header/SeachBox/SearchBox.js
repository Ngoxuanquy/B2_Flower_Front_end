import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <div className="searchBox d-flex align-items-center posotion-relative">
      <FaSearch style={{ marginRight: 8 }} />
      <input type="text" placeholder="Search here..." />
    </div>
  );
};
export default SearchBox;
