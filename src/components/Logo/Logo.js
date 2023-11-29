import React from "react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import brain from "./brain.png";
import "./logo.css";

const Logo = () => {
  return (
    <div className="container">
      <Tilt>
        <div className="tilt center">
          <Image src={brain} alt="brain logo" width={"auto"} height={"auto"} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
