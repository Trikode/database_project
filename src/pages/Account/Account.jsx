import React from "react";
import { useState } from "react";
import "./account.css";
import LoginForm from "../../components/Account/LoginForm";
import RegistrationForm from "../../components/Account/RegistrationForm";
// import UserList from "../../components/Account/Testaccount";

const Account = () => {
  const [isActive, setIsActive] = useState(true);
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:3308/api/users')
  //     .then((response) =>response.json())
  //     .then((data) => setUsers(data))
  //     .catch((error) => console.error('Error:', error));
  // }, []);
  // console.log(users)

  return (
    <div className="AccountContainer">
      <div className="Acontainer">
        <div className="Alabels">
          <button
            onClick={() => setIsActive(true)}
            className={`loginL ${isActive ? "active" : ""}`}
          >
            <h2>Login</h2>
          </button>
          <button
            onClick={() => setIsActive(false)}
            className={`regL ${isActive ? "" : "active"}`}
          >
            <h2>Register</h2>
          </button>
        </div>

        <div className="AccountForms">
          {isActive ? <LoginForm /> : <RegistrationForm />}
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
  );
};

export default Account;
