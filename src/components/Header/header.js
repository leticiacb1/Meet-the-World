import React from "react";
import './header.css';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useNavigate} from "react-router-dom";

function Header(){

    const navigate = useNavigate();

    function goToPerfil(){
        console.log("Cliqueiiii")
        navigate('/favorites')
    }
    
    return (
        <div className="header">
            <h3 className="headerContent">Random Word</h3>
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