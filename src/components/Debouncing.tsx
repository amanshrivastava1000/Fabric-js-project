import React, { useState, useEffect } from "react";

const DebouncedSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};

export default DebouncedSearch;
