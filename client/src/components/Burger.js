import React from "react";

const Burger = ({ burger }) => {
  return (
    <div className="burger-container">
      <div className="bread-top"></div>
      {burger.map((slice, index) => (
        <div
          key={index}
          className={`slice ${slice.slice.type}`}
          style={{ backgroundColor: slice.slice.color }}
        >
          {slice.slice.name}
        </div>
      ))}
      <div className="bread-bottom"></div>
    </div>
  );
};

export default Burger;
