import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Start() {
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([])

  const autoLogin = async () => {
    const res = await axios.get("http://localhost:3005/library/profile");
    setUser(res.data.user);
    console.log(res)
  };

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:3005/library/books")
    setBooks(res.data)
  }

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    autoLogin()
    fetchBooks()
  }, []);

  const handelLogout = () => {
    localStorage.removeItem("accessToken")
    delete axios.defaults.headers.common["Authorization"]
    setUser("")
  };


  return (
    <div className="start-page">
      {user ? (
        <button className="sign-out-btn" onClick={handelLogout}>sign out</button>
      ) : (
        <Link to="login" className="login-btn">login</Link>
      )}

      <Link to="register" className="register-btn">register</Link>

      {user.role === "ADMIN" && <Link to="/admin/dashboard" className="dashboard-btn">Admin Dashboard</Link>}
      

      {user && (
        <>
        <h1 className="welcome-txt">Välkommen  {user.username}!</h1>
        <p className="role-txt">Du är en: {user.role}</p>
        <p className="role-txt">Du har {user.password} som lösenord</p>
        </>
      )}
      <div className="container">
        <div className="box">
        <p className="start-header books-title">Title</p>
        <p className="start-header books-author">Author</p>
        <p className="start-header books-qty">Availability</p>
        </div>
      {books && books.map((book) => (
        <div className="start all-books" key={book.title}>
        <p className="books-title">{book.title}</p>
        <p className="books-author">{book.author}</p>
        <p className="books-qty">{book.quantity}</p>     
        </div>
      ))}
      </div>
    </div>
  );
}
