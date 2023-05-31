/**
 * Author: Victoria Esko
 * Date: 31 May
 * 
 * The "Dashboard" React component is an admin page with tabs for managing users and books. It imports React, axios, and Material-UI components. The component handles user and book operations, includes a form for adding/editing books, and fetches data on component mount. It ensures authorization and provides a user-friendly interface for administrators to perform CRUD operations on users and books.
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import TabPanel from "../Components/TabPanel";

export default function Dashboard() {

  
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([]);
  const [value, setValue] = useState(0);
  const [modal, setModal] = useState(false)

  
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [quantity, setQuantity] = useState("")
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3005/admin/users");
    setUser(res.data);
    // console.log(res);
  };

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:3005/library/books");
    setBooks(res.data);
    // console.log(res);
  };

  const handlePromoteUser = (users) => {
    axios.put("http://localhost:3005/admin/users", {
      username: users.username,
    });

    fetchUsers()
  };

  const handleDeleteUser = (users) => {
    const config = {
      data: {
        username: users.username,
      },
    };
    axios.delete("http://localhost:3005/admin/users", config);

    fetchUsers();
  };

  const handleDeleteBook = (book) => {
    const config = {
      data: {
        title: book.title,
      },
    };
    axios.delete("http://localhost:3005/admin/books", config)

    fetchBooks();
  };


  useEffect(() => {
    
    fetchUsers();
    fetchBooks();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post("http://localhost:3005/admin/books", title, author, quantity);
    console.log(res)
  }


  console.log(title + author + quantity)

  if (user.role !== "ADMIN") return "You are not authenticated!"
  
  return (
    <>
      <h1>Admin-Page</h1>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Users" />
        <Tab label="Books" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography component={"span"} className="usersTab">
          {user &&
            user.map((users) => (
              <div key={users.username}>
                <p>{users.username}</p>
                <p>{users.role}</p>
                <button type="button" onClick={() => handlePromoteUser(users)}>Promote</button>
                <button type="button" onClick={() => handleDeleteUser(users)}>Delete</button>
              </div>
            ))}
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography component={"span"} className="booksTab">
          <button onClick={() => setModal(!modal)}>Add new book</button>
            {modal && 
            <div>
                <h2>Add/Edit books</h2>
                <label for="title">Title: </label>
                <input type="text" placeholder="write title here ..." name="title" onChange={(e) => setTitle(e.target.value)}/>
                <label for="author">Author: </label>
                <input type="text" placeholder="write author here ..." name="author" onChange={(e) => setAuthor(e.target.value)}/>
                <label for="quantity">Quantity: </label>
                <input type="text" placeholder="write quantity here ..." name="quantity" onChange={(e) => setQuantity(e.target.value)}/>
                <button type="submit" onClick={handleSubmit}>Add/Edit</button>
                <button type="button">cancel</button>
            </div>}
          {books &&
            books.map((book) => (
              <div key={book.title}>
                <p>{book.title}</p>
                <p>{book.author}</p>
                <p>{book.quantity}</p>
                <button type="button" onClick={() => handleDeleteBook(book)}>Delete</button>
              </div>
            ))}
        </Typography>
      </TabPanel>
    </>
  );
}
