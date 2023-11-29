import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "../forms.css";
import { toast } from "react-toastify";

const Signin = ({ onRouteChange, loadUser }) => {
  const [signin, setSignin] = useState({ email: "", password: "" });

  const onSigninChange = (event) => {
    const signinAccount = { ...signin };

    signinAccount[event.target.name] = event.target.value;
    setSignin(signinAccount);
  };

  const onSigninSubmit = () => {
    fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    })
      .then((response) => response.json())
      .then((response) => {
        const { token, error } = response;

        if (error) return toast(error, { type: "error", delay: 2000 });

        if (token) {
          const user = jwtDecode(token);
          if (user.id) {
            localStorage.setItem("token", token);
            loadUser(user);
            onRouteChange("home");
          }
        }
      })
      .catch((error) => toast(error.message, { type: "error", delay: 2000 }));
  };

  return (
    <div className="card">
      <div className="signin-register-form">
        <h1 className="signin-register--heading">Sign In</h1>
        <div className="input-flex">
          <label htmlFor="email">Email</label>
          <input
            onChange={onSigninChange}
            className="inputField"
            id="email"
            name="email"
            type="text"
          />
        </div>
        <div className="input-flex">
          <label htmlFor="password">Password</label>
          <input
            className="inputField"
            id="password"
            name="password"
            type="password"
            onChange={onSigninChange}
          />
        </div>

        <button onClick={onSigninSubmit} className="signin-register-button">
          Sign in
        </button>

        <p className="sr-button" onClick={() => onRouteChange("register")}>
          Register
        </p>
      </div>
    </div>
  );
};

export default Signin;
