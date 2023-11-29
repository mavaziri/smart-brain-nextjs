import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div style={{ color: "white" }}>
      <h2>{name}, Your Rank is:</h2>
      <h1>#{entries}</h1>
    </div>
  );
};

export default Rank;
