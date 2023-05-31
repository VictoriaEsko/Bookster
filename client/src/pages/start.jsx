/**
 * Author: Victoria Esko
 * Date: 31 May
 * 
 * The "Start" component is the main page. It manages user, book, and search state variables. It performs auto-login and fetches books using axios. It displays a sign out button, login/register links, and admin dashboard link based on user status. It allows searching for books and displays book details in a list. This component enables user authentication, book search, and information display.
 */

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Start() {
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([])
  const [query, setQuery] = useState("")

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

  const handleSearchBooks = async () => {
    const res = await axios.get(`http://localhost:3005/library/books/search?q=${query}`)
    console.log(res)
    setBooks(res.data)
  }


  return (
    <>
      {user ? (
        <button onClick={handelLogout}>sign out</button>
      ) : (
        <Link to="login">login</Link>
      )}

      <Link to="register">register</Link>

      {user.role === "ADMIN" && <Link to="/admin/dashboard">Admin Dashboard</Link>}
      

      {user && (
        <>
        <h1>Välkommen  {user.username}!</h1>
        <p>Du är en: {user.role}</p>
        <p>Du har {user.password} som lösenord</p>
        </>
      )}

      <input type="text" placeholder="search book..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearchBooks}>search</button>

      {books && books.map((book) => (
        <div key={book.title}>
        <p>{book.title}</p>
        <p>{book.author}</p>
        <p>{book.quantity}</p>      
        </div>
      ))}
    </>
  );
}
