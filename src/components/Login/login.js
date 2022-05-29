import { Link, useNavigate , useLocation } from "react-router-dom";
import  React , { useState, useEffect } from "react";

import './login.css';
import Backgroung from "../Background/background.js"

import axios from 'axios';

function Login() {

  const [user, setUser] = useState('') 
  const [password, setPassword] = useState('')

  function handleSubmit(event){
    event.preventDefault()  
    console.log("Submitou")
  }

  return (
    <div className="screen">
        <Backgroung></Backgroung>
        <div className="containerLogin">
            <h3 className="textLoginHeader"> Sign in </h3>
            <form className="formLogin" onSubmit={handleSubmit}>
                
                <div className="userInput">
                    <label className="textLogin"> Username or Email  </label>
                    <input type="text" id="username" onChange={(username) => setUser(username.target.value)}/>
                </div>

                <div className="userInput">
                    <label className="textLogin"> Password  </label>
                    <input type="password" id="password" onChange={(senha) => setPassword(senha.target.value)}/>
                </div>

                <div className="divButtonLogin">
                    <button type="Submit" className="buttonLogin">Login</button>
                </div>
            
            </form>
        </div>

    </div>);
}

export default Login;