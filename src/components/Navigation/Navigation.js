import React from "react";
import "./navigation.css";

const Navigation = ({ onRouteChange, isSignedIn, setImageUrl }) => {
  const signOut = () => {
    setImageUrl(null);
    localStorage.removeItem("token");
    onRouteChange("signin");
  };

  if (!isSignedIn) {
    return (
      <nav className="signout">
        <p className="signout-text" onClick={() => onRouteChange("signin")}>
          Sign In
        </p>
        <p className="signout-text" onClick={() => onRouteChange("register")}>
          Register
        </p>
      </nav>
    );
  }

  return (
    <nav className="signout">
      <p className="signout-text" onClick={signOut}>
        Sign out
      </p>
    </nav>
  );
};

export default Navigation;
