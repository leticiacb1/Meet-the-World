import React from "react";
import './header.css';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate} from "react-router-dom";
import logo from "./logo.png";

function Header(props){

    const navigate = useNavigate();

    function goToPerfil(){
        console.log("Cliqueiiii")
        navigate('/favorites')
    }
    
    return (
        <div className="header">
            <button onClick={props.goTo} className="btn_icon">
                <ArrowBackIcon sx={{ color: "white" , fontSize: 40 , display:props.condicao}}></ArrowBackIcon>
            </button>
            <img src={logo} className="headerLogo"></img>
            <div className="divIconsHeader">
                <button onClick={goToPerfil} className="btn_icon">
                    <AccountCircleSharpIcon sx={{ color: "white" , fontSize: 40}}></AccountCircleSharpIcon>
                </button>
                <button className="btn_icon">
                    <GitHubIcon sx={{ color: "white" }} fontSize="large"></GitHubIcon>
                </button>
            </div>
        </div>
    );
}

export default Header;