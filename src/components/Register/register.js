import { Link, useNavigate , useLocation } from "react-router-dom";
import  React , { useState, useEffect } from "react";

import './register.css';
import Backgroung from "../Background/background.js"

import axios from 'axios';

function Register() {

  const [user, setUser] = useState('') 
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault();
    navigate('/home');
  }

  return (
    <div className="screen">
        <Backgroung></Backgroung>
        <div className="containerRegister">
            <h3 className="textLoginHeader"> Sign Up </h3>

            <form className="formLogin" onSubmit={handleSubmit}>
                
                <div className="userCreate">
                    <label className="textLogin"> First Name</label>
                    <input type="text" id="username" onChange={(username) => setUser(username.target.value)}/>
                </div>

                <div className="userCreate">
                    <label className="textLogin"> Last Name</label>
                    <input type="text" id="username" onChange={(username) => setUser(username.target.value)}/>
                </div>

                <div className="userCreate">
                    <label className="textLogin"> Email</label>
                    <input type="text" id="username" onChange={(username) => setUser(username.target.value)}/>
                </div>

                <label for="cars">Choose a region:</label>
                <select name="region" id="region">
                    <option value="volvo">Europe</option>
                    <option value="saab">Asia</option>
                    <option value="opel">North America</option>
                    <option value="audi">South America</option>
                    <option value="opel">Africa</option>
                    <option value="audi">Australia</option>
                    <option value="opel">Antarctica</option>
                </select>
               <br></br>
	                
                <div className="userCreate">
                    <label className="textLogin"> Password  </label>
                    <input type="password" id="password" onChange={(senha) => setPassword(senha.target.value)}/>
                </div>

                <div className="divButtonCreate">
                    <button type="Submit" className="buttonCreate">Create</button>
                </div>

            </form>
        </div>
    </div>);
}

export default Register;