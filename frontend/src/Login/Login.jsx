import React from "react";
import { auth, provider } from "../utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Header from "../Header/Header";

const Login = () => {
  const navigate = useNavigate();
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        phoneNumber: user.phoneNumber,
      };

      const apiResponse = await fetch(
        import.meta.env.VITE_API_URL + "/auth/google-login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!apiResponse.ok) {
        const errorData = await apiResponse.text();
        console.error("Error Response from Backend:", errorData);
        throw new Error(
          `Failed to login. Server responded with: ${apiResponse.status} ${apiResponse.statusText}`
        );
      }

      const responseData = await apiResponse.json();

      localStorage.setItem(
        "user",
        JSON.stringify(responseData.user || userData)
      ); // for redirect logic

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <Header />
      <h1 className="login-title">Google Login Integration</h1>
      <button className="google-button" onClick={googleLogin}>
        Sign In With Google
      </button>
    </div>
  );
};

export default Login;
