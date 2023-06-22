import React from "react";
import { useState, useEffect} from "react";
import "./account.css"
import LoginForm from "../../components/Account/LoginForm";
import RegistrationForm from "../../components/Account/RegistrationForm";
import Navbar from "../../components/Navbar/Navbar";
import { useLiveItems } from "../../App";
// import UserList from "../../components/Account/Testaccount";

const Account = ()=>{
    const [isActive, setIsActive] = useState(true);
    const { isLogged,setIsLogged,currentUser} = useLiveItems();
    const [users, setUsers] = useState([]);
    const [uF_name,setUF_name] = useState("");
    const [uL_name,setUL_name] = useState("");
    const [uEmail,setUEmail] = useState("");
    const [uPhone,setUPhone] = useState("");
    const [uRole,setURole] = useState("");
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        size: '',
        color: '',
        genre: '',
        quantity: '',
        price: '',
        image: '',
      });

    

    useEffect(() => {
      fetch('http://localhost:3308/api/users')
        .then((response) =>response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error:', error));
    }, []);  
    useEffect(()=>{
        const user = users.find((user) => user.email === currentUser);
        setUF_name(user?.f_name);
        setUL_name(user?.l_name);
        setUEmail(user?.email);
        setUPhone(user?.phone_number);
        setURole(user?.role_id)

    },[users,currentUser])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    
        // Send form data to the backend API
        fetch('http://localhost:3308/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Handle the response from the server
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
    return(
    <>
    <Navbar/>
    {isLogged && uRole === 1?( 
    <div className="AccountContainerLogged">
        <div className="AloggedSidebar">
            <button onClick={()=>{setIsLogged(false)}}>Log out</button>
        </div>  
        <div className="AoptionsAccount">
            <div className="AcontainerLogged"> 
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="size">Size:</label>
        <input
          type="text"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          required
        /><br />

       <button type="submit">add</button>
  </form>
                
            </div>
            <div className="AcontainerLogged">

            </div>
        </div>
    </div>
    ):isLogged?(
    <div className="AccountContainerLogged">
        <div className="AloggedSidebar">
            <button onClick={()=>{setIsLogged(false)}}>Log out</button>
        </div>  
        <div className="AoptionsAccount">
            <div className="AcontainerLogged"> 
                <div className="AavatarImg">
                    <img src="" alt="" />
                </div>
                <div className="Adesc">
                    <div>Name: <b>{uF_name}</b></div>
                    <div>Surname: <b>{uL_name}</b></div>
                    <div>Email: <b>{uEmail}</b></div>
                    <div>Phone: <b>{uPhone}</b></div>
                </div>
                
            </div>
            <div className="AcontainerLogged">

            </div>
        </div>
    </div>
    ):(
    <div className="AccountContainer">
        <div className="Acontainer"> 
            <div className="Alabels">
                <button onClick={()=>setIsActive(true)}className={ `loginL ${isActive ? "active" : ""}`}><h2 >Login</h2></button>
                <button onClick={()=>setIsActive(false)}className={ `regL ${isActive ? "" : "active"}`}><h2 >Register</h2></button>
            </div>
            
            <div className="AccountForms">
                {isActive?<LoginForm/>:<RegistrationForm/>}
            </div>
            <div>
      {/* <h1>Users</h1>
      <ul>
        {users.map((user,Uidx) =>{ 
            return <UserList key={Uidx} email={user.email} psw={user.password}/>
        })}
      </ul> */}
    </div>
        </div>
       
    </div>
    )}
   </>
    );
};

export default Account