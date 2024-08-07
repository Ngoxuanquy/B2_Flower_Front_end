import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  const test = (a, b) => {
    return a + b;
  };
  return (
    <div className="searchBox d-flex align-items-center posotion-relative">
      <FaSearch style={{ marginRight: 8 }} />
      <input type="text" placeholder="Tìm kiếm..." />
    </div>
  );
};
export default SearchBox;
