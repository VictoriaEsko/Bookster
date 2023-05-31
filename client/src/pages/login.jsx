import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3005/auth/login", {
      username,
      password,
    });
    setUsername("");
    setPassword("");
    localStorage.setItem("accessToken", res.data.accessToken);
    console.log(res);
    navigate("/")
  };

    return(
      <>
      <div className="login-page">
      <form data-testid="login-form" className="form">
        <div className="input-field">
          <label className="username-label">Username</label>
          <input type="text" placeholder="Insert username..."
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} className="input-login">
          </input>
        </div>

        <div className="input-field">
           <label className="password-label">Password</label>
           <input
             type="password"
             placeholder="Insert password..."
             data-testid="password-field"
             name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)} className="input-login"
           />
         </div>

         <button data-testid="login-btn" type="submit" onClick={handleLogin} className="btn-login">
           Login
         </button>
         <button data-testid="cancel-btn" type="reset" className="btn-cancel-login">
           Cancel
         </button>
    
      </form>
      </div>
      </>
    );
  }