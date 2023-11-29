import React from "react";
import "./faceRecognition.css";
import Image from "next/image";

const FaceRecognition = ({ imageUrl, box, imageError }) => {
  if (!imageUrl && !imageError) return null;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!imageError ? (
        <>
          <div style={{ position: "relative", marginTop: "10px" }}>
            <Image
              id="inputImage"
              alt=""
              src={imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "500px", height: "auto" }} // optional
            />
            <div
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          </div>
        </>
      ) : (
        <p style={{ color: "white" }}>Please Provide an Appropriate Image.</p>
      )}
    </div>
  );
};

export default FaceRecognition;
