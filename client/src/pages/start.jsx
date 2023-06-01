/**
 * Author: Victoria Esko
 * Date: 31 May
 * 
 * The "Start" component is the main page. It manages user, book, and search state variables. It performs auto-login and fetches books using axios. It displays a sign out button, login/register links, and admin dashboard link based on user status. It allows searching for books and displays book details in a list. This component enables user authentication, book search, and information display.
 */

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function Start() {
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([])
  const [modal, setModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState([])
  const [quantity, setQuantity] = useState(0)
  
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

  const handleOpenPurchase = (book) => {
    setModal(true)
    setSelectedBook(book)
  }

  const handelLogout = () => {
    localStorage.removeItem("accessToken")
    delete axios.defaults.headers.common["Authorization"]
    setUser("")
  };

  const handlePurchase = async () => {
    const res = await axios.post("http://localhost:3005/library/user/books", {title: selectedBook.title, quantity})
    console.log(res);
  };

  const handleSearchBooks = async () => {
    const res = await axios.get(`http://localhost:3005/library/books/search?q=${query}`)
    console.log(res)
    setBooks(res.data)
  }


  console.log(quantity)
  return (
    <div className="start-page">
    <div className="important-btn">
      {user ? (
        <button data-testid="logout" className="sign-out-btn btn" onClick={handelLogout}>sign out</button>
      ) : (
        <Link to="login" className="login-btn btn">login</Link>
      )}

      <Link to="register" className="register-btn btn">register</Link>

      {user.role === "ADMIN" && <Link to="/admin/dashboard" className="dashboard-btn btn">Admin Dashboard</Link>}
    </div>
      

      {user && (
        <>
        <h1 className="welcome-txt">Välkommen  {user.username}!</h1>
        <p className="role-txt">Du är en: {user.role}</p>
        </>
      )}
      <div className="search-bar-container"> 
      <input className="search-bar" type="text" placeholder="search book..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button className="search-bar-btn" onClick={handleSearchBooks}>search</button>
      </div>
      <div className="container">
        <div className="box">
        <p className="start-header books-title">Title</p>
        <p className="start-header books-author">Author</p>
        <p className="start-header books-qty">Availability</p>
        <p className="start-header books-qty">Order</p>
        </div>
      </div>

      {books && books.map((book) => (
        <div className="start all-books" key={book.title}>
          <p className="books">{book.title}</p>
          <p className="books">{book.author}</p>
          <p className="books">{book.quantity}</p>  
          {user && (
            <div className='quantity'>
             <button  onClick={() => handleOpenPurchase(book)}>
                Buy
             </button>
            </div>
          )}
          
        </div>
        
      ))}
        {modal && (<>
            <button><FontAwesomeIcon icon={faChevronUp} onClick={() => setQuantity(quantity + 1)} /></button>
            <p>{quantity}</p>
           <button><FontAwesomeIcon icon={faChevronDown} onClick={() => setQuantity(quantity - 1)} /></button>
           <button onClick={handlePurchase}>
                 köp</button>
           </>)}
      
    </div>
  );
}

