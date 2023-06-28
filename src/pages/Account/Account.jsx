import React from "react";
import { useState, useEffect } from "react";
import "./account.css";
import LoginForm from "../../components/Account/LoginForm";
import RegistrationForm from "../../components/Account/RegistrationForm";
import Navbar from "../../components/Navbar/Navbar";
import { useLiveItems } from "../../App";
import { useNavigate } from "react-router-dom";
// import UserList from "../../components/Account/Testaccount";

const Account = () => {
  const [isActive, setIsActive] = useState(true);
  const { isLogged, setIsLogged, currentUser } = useLiveItems();
  const [users, setUsers] = useState([]);
  const [uF_name, setUF_name] = useState("");
  const [uL_name, setUL_name] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uPhone, setUPhone] = useState("");
  const [uRole, setURole] = useState("");

  useEffect(() => {
    fetch("http://localhost:3308/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    const user = users.find((user) => user.id_user === currentUser.id_user);
    setUF_name(user?.f_name);
    setUL_name(user?.l_name);
    setUEmail(user?.email);
    setUPhone(user?.phone_number);
    setURole(user?.role_id);
  }, [users, currentUser]);

  let redirectToPage = useNavigate();
  return (
    <>
      <Navbar />
      {isLogged && uRole === 1 ? (
        redirectToPage("/admin")
      ) : isLogged ? (
        <div className="AccountContainerLogged">
          <div className="AloggedSidebar">
            <button
              onClick={() => {
                setIsLogged(false);
              }}
            >
              Log out
            </button>
          </div>
          <div className="AoptionsAccount">
            <div className="AcontainerLogged">
              <div className="AavatarImg">
                <img src="" alt="" />
              </div>
              <div className="Adesc">
                <div>
                  Name: <b>{uF_name}</b>
                </div>
                <div>
                  Surname: <b>{uL_name}</b>
                </div>
                <div>
                  Email: <b>{uEmail}</b>
                </div>
                <div>
                  Phone: <b>{uPhone}</b>
                </div>
              </div>
            </div>
            <div className="AcontainerLogged"></div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Account;
