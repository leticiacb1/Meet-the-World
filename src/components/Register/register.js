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
    navigate('/');
  }

  return (
    <div className="screen">
        <Backgroung></Backgroung>
        <div className="containerRegister">
            <h3 className="textRegisterHeader"> Sign Up </h3>

            <form className="formRegister" onSubmit={handleSubmit}>
                
                <div className="userCreate">
                    <label className="textRegister"> First Name</label>
                    <input type="text" id="username" onChange={(username) => setUser(username.target.value)}/>
                </div>

                <div className="userCreate">
                    <label className="textRegister"> Last Name</label>
                    <input type="text" id="username" onChange={(username) => setUser(username.target.value)}/>
                </div>

                <div className="userCreate">
                    <label className="textRegister"> Username</label>
                    <input type="text" id="username" onChange={(username) => setUser(username.target.value)}/>
                </div>

                <div className="userCreate">
                    <label className="textRegister"> Email</label>
                    <input type="text" id="username" onChange={(username) => setUser(username.target.value)}/>
                </div>

                <div className="userCreate">
                    <label className="textRegister">Region</label>
                    <select name="region" id="region">
                        <option value="default"  selected disabled hidden>region</option>
                        <option value="volvo">Europe</option>
                        <option value="saab">Asia</option>
                        <option value="opel">North America</option>
                        <option value="audi">South America</option>
                        <option value="opel">Africa</option>
                        <option value="audi">Australia</option>
                        <option value="opel">Antarctica</option>
                    </select>
                    <br></br>
                </div>
                
                <div className="userCreate">
                    <label className="textRegister"> Password  </label>
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