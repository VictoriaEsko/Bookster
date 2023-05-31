/**
 * Author: Victoria Esko
 * Date: 31 May
 * 
 * The "RegisterForm" React component represents a registration form. It imports React, axios, and the useNavigate hook. The component manages the username and password inputs using useState. When the signup button is clicked, it sends a POST request to the server for user registration. Upon successful registration, it clears the stored username and access token, resets the inputs, and navigates to the home page.
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate()


  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3005/auth/register", {
      username,
      password,
    });
    console.log(res);
    localStorage.removeItem("username")
    localStorage.removeItem("accessToken")
    setUsername("");
    setPassword("");
    navigate("/")
  };

    return(
      <>
      <div>
      <form data-testid="login-form">
        <div>
          <label>Username</label>
          <input type="text" placeholder="Insert username..."
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}>
          </input>
        </div>

        <div>
           <label>Password</label>
           <input
             type="password"
             placeholder="Insert password..."
             data-testid="password-field"
             name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
         </div>

         <button data-testid="login-btn" type="submit" onClick={handleRegister}>
           Sign up
         </button>
         <button data-testid="cancel-btn" type="reset">
           Cancel
         </button>
    
      </form>
      </div>
      </>
    );
  }