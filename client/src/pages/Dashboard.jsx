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

  const handleChangeBooks = () => {

  }

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3005/admin/users");
    setUser(res.data);
    console.log(res);
  };

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:3005/library/books");
    setBooks(res.data);
    console.log(res);
  };

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    fetchUsers();
    fetchBooks();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post("http://localhost:3005/admin/books", title, author, quantity);
    console.log(res)
  }


  console.log(title + author + quantity)
  
  return (
    <>
      <Link to="/">Back</Link>
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
              </div>
            ))}
        </Typography>
      </TabPanel>
    </>
  );
}
