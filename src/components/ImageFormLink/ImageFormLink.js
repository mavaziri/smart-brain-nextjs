import React from "react";
import "./imageFormLink.css";

const ImageFormLink = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
        This Magic Brain Will Detect Your Face.
      </p>
      <div className="center">
        <div className="form center">
          <input
            className="face-recognition-input"
            type="text"
            onChange={onInputChange}
          />
          <button className="detect-button" onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageFormLink;
