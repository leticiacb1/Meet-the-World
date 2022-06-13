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

  function onChangeValue(event) {
    setRegion(event.target.value);
    console.log(event.target.value);
}

  function handleSubmit(event){
    event.preventDefault();

    axios({
        method:'post',
        url:"https://frozen-sierra-18977.herokuapp.com/api/users/", 
        data:{
           
            "username": userName,
            "email": email,
            "password": password,
            "first_name": firstName,
            "last_name": lastName,
            "region": region,

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

                <div className="userCreate" onChange={(event)=>onChangeValue(event)}>
                    <label className="textRegister">Region</label>
                    <select name="region" id="region">
                        <option value="default"  selected disabled hidden>region</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="North">North America</option>
                        <option value="South">South America</option>
                        <option value="Africa">Africa</option>
                        <option value="Australia">Australia</option>
                        <option value="Antarctica">Antarctica</option>
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