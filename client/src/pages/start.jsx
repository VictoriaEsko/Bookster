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
