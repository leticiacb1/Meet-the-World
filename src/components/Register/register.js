import { useNavigate  } from "react-router-dom";
import  React , { useState } from "react";

import './register.css';
import Backgroung from "../Background/background.js"

import axios from 'axios';

function Register() {
  
  const [firstName , setFirstName] = useState('') 
  const [lastName , setLastName] = useState('')
  const [userName, setUserName] = useState('') 
  const [email, setEmail] = useState('') 
  const [region, setRegion] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault();

    axios({
        method:'post',
        url:"http://localhost:8000/api/users/", 
        data:{
           
            "username": userName,
            "email": email,
            "password": password,
            "first_name": firstName,
            "last_name": lastName

        },}).then(
            (response)=>{
                navigate('/');
            }

        , (e)=>{
            alert("Email ou Username já cadastrados!");
            navigate('/register');
        })
  }


  return (
    <div className="screen">
        <Backgroung></Backgroung>
        <div className="containerRegister">
            <h3 className="textRegisterHeader"> Sign Up </h3>

            <form className="formRegister" onSubmit={handleSubmit}>
                
                <div className="userCreate">
                    <label className="textRegister"> First Name</label>
                    <input type="text" onChange={(firstName) => setFirstName(firstName.target.value)} required/>
                </div>

                <div className="userCreate">
                    <label className="textRegister"> Last Name</label>
                    <input type="text" onChange={(lastName) => setLastName(lastName.target.value)} required/>
                </div>

                <div className="userCreate">
                    <label className="textRegister"> Username</label>
                    <input type="text" onChange={(username) => setUserName(username.target.value)} required/>
                </div>

                <div className="userCreate">
                    <label className="textRegister"> Email</label>
                    <input type="text" onChange={(email) => setEmail(email.target.value)} required/>
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
                    <input type="password" onChange={(password) => setPassword(password.target.value)} required/>
                </div>

                <div className="divButtonCreate">
                    <button type="Submit" className="buttonCreate">Create</button>
                </div>

            </form>
        </div>
    </div>);
}

export default Register;