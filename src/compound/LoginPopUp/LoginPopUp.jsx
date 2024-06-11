// LoginPopUp.jsx
import React, { useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";

const LoginPopUp = ({ setshowlogin, onLoginSuccess }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentState === "Register" && !passwordsMatch) {
      console.log("Passwords do not match");
      return;
    }

    const formData = {
      email,
      password,
      ...(currentState === "Register" && { name }),
    };

    const url =
      currentState === "Login"
        ? "https://back-end-six-liart.vercel.app/api/user/login"
        : "https://back-end-six-liart.vercel.app/api/user/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Form Data Submitted:", result);

      if (result.success) {
        alert("success");
        console.log("Success:", result);
        onLoginSuccess(name, email); // Pass name and email to onLoginSuccess function
      } else {
        alert(result.message);
        console.log("Error:", result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="Loginpopup">
      <form className="loginpopup-con" onSubmit={handleSubmit}>
        <div className="loginpopup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setshowlogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="loginpopup-input">
          {currentState === "Register" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {currentState === "Register" && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          )}
          {!passwordsMatch && currentState === "Register" && (
            <p className="error-message">Passwords do not match</p>
          )}
        </div>
        <button type="submit">
          {currentState === "Register" ? "Create Account" : "Login"}
        </button>
        <div className="loginpopup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrentState("Register")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an Account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
