import React, { useState, useEffect } from "react";

const ThrottledInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [throttledValue, setThrottledValue] = useState("");

  useEffect(() => {
    let timeout:any;
    
    const handler = () => {
      setThrottledValue(inputValue);
      timeout = null;
    };

    if (!timeout) {
      timeout = setTimeout(handler, 500); // Throttle time: 500ms
    }

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <div>
      <input
        type="text"
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>Throttled Value: {throttledValue}</p>
    </div>
  );
};

export default ThrottledInput;
