import React from "react";
import "./Loader.css"; // Import additional styles if necessary

const Loader = ({ fading }) => {
  return (
    <div className={`loader-container ${fading ? "fade-out" : ""}`}>
      <div className="relative w-[calc(3*30px+26px)] h-[calc(2*30px+26px)]">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-[26px] h-[26px] bg-[#9d4edd] rounded-sm animate-square${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
