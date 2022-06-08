import React from "react";
import './header.css';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate} from "react-router-dom";
import logo from "./logo.png";

function Header(props){

    const navigate = useNavigate();

    function goToPerfil() {
        navigate('/favorites', {state:{username:props.username, token:props.token}});
    }
    return (
        <div className="header">
            <button onClick={props.goTo} className="btn_icon">
                <ArrowBackIcon sx={{ color: "white" , fontSize: 40 , display:props.condicao}}></ArrowBackIcon>
            </button>
            <img src={logo} className="headerLogo"></img>
            <div className="divIconsHeader">
                <button onClick={goToPerfil} className="btn_icon">
                <FolderSpecialIcon  sx={{ color: "white" , fontSize: 35}} ></FolderSpecialIcon>
                </button>
                <button className="btn_icon">
                    <a  href="https://github.com/insper-tecnologias-web/projeto-3-LLL" target="_blank"> 
                    <GitHubIcon sx={{ color: "white" }} fontSize="large">
                    </GitHubIcon>
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Header;