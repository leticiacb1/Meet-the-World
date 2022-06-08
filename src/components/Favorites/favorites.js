import React, {useEffect, useState} from "react";
import Header from '../Header/header.js'
import './favorites.css';
import favoriteNews from './favorite_news.jpeg'
import favoriteMusic from './favorite_musics.jpeg'
import { useNavigate, useLocation } from "react-router-dom";
const axios = require("axios");


export default function Favorites() {

    const navigate = useNavigate();
    const location = useLocation();

    const [newss, setNewss] = useState([]);
    const [musics, setMusics] = useState([]);
    // var newss = [];
    // var musics = [];

    const username = location.state.username;
    const token = location.state.token;

    function backMap(){
        navigate('/home', {state:{username:username, token:token}})
    }


    useEffect(() => {
        async function carrega ()  {
            await axios({
                method:'get',
                url:`http://localhost:8000/api/newss/`, 
                headers: {
                    'Authorization': `Token ${token}`
                  }
                }).then(
                    (res1)=>{
                        setNewss(res1.data);
                }, (e)=>{
                    alert(e);
                });
            await axios({
                method:'get',
                url:`http://localhost:8000/api/musics/`,
                headers: {
                    'Authorization': `Token ${token}`
                    }
                }).then(
                    (res2)=>{
                        setMusics(res2.data);
                }, (e)=>{
                    alert(e);
                });
            };
        carrega();
        console.log(newss);
        console.log(musics);
        }, []);
    
    return (
        
        <div className = 'container-favorites'>
        <Header goTo={backMap}></Header>
        <div className='headers'> 
        <div className="formatacao_news">
            <img src = {favoriteNews} className='news-header'></img> 
        </div>
        <div className="formatacao_music">
            <img src = {favoriteMusic} className='music-header'></img> 
        </div>            
        </div>
        <div className = 'divisor'>
            <div className = 'news'>
                    {newss.map((noticias) => (
                        <div className="newsCard" key={"noticias_" + noticias.title}>
                            <div className="newsInfo">
                                <img src={noticias.img} className="mediaNews" alt="newsImage" />
                                <div className="contentTitle">
                                    <h4 className="newsTitle">{noticias.title}</h4>
                                </div>
                                <div className="contentResume">
                                    <div className="newsResume">{noticias.content.slice(0,200)} </div>
                                </div>
                                <a className="readmoreTag" href={noticias.link} target="_blank">Read more</a>
                            </div>
                        </div>
                    ))}
            </div>
            <div className = 'musics'>
                        {musics.map((musica) => (
                            <div className="musicCard2" key={"noticias_" + musica.titulo}>
                                <div className = "photoDiv2">
                                    <img src = {musica.img} className = "musicPhoto2"></img>
                                </div>
                                <div className="musicInfo2">
                                    <div className="divHeaderMusic2">
                                        <div className="nameMusic">{musica.titulo}</div>
                                    </div>
                                    <div className="divContentPlay2">
                                        <div className="nameArtistMusic2">Artist : {musica.artista}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    </div>
    )
};