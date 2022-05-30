import React, {useEffect, useState} from "react";
import './favorites.css';
const axios = require("axios");



export default function Favorites() {

    const [newss, setNewss] = useState([]);
    const [musics, setMusics] = useState([]);


    useEffect(() => {
      axios
      .get('http://127.0.0.1:8000/api/newss/')
      .then((res1) => {
        setNewss(res1.data);
        console.log(newss);
    });
    axios
    .get('http://127.0.0.1:8000/api/musics/')
    .then((res2) => {
        setMusics(res2.data); 
        console.log(musics);
    });
    }, []);
    
    return (
    <div className = 'container-favorites'>
        <div className = 'titulo'>
            <h1> Favorites </h1>
        </div>
        <div className = 'divisor'>
            <div className = 'news'>
                <h1> 
                    News
                </h1>
                <div className = 'ajusta-card-news' >
                {newss.map((news) => (
                    <div className = "card-news" key={`news__${news.id}`}> 
                        <div className="dentro-card">
                            <h3>
                            {news.title}
                            </h3>
                            <textarea readOnly name = 'noticia' value={news.content}>
                            </textarea>                          
                        </div> 
                    </div>
                ))}
                </div>
            </div>
            <div className = 'musics'>
                <h1>
                    Musics
                </h1>
                <div className = 'ajusta-card-musics'>
                {musics.map((music) => (
                        <div className='card-musics' key={`music__${music.id}`}>
                            <div className="dentro-card-music">
                                <div className='musica'>
                                    <h5> {music.titulo}</h5> 
                                    <h6> {music.artista} </h6>
                                </div>
                                {/* <div className = 'botao'>
                                    <button className = 'botao-back'> 
                                        <img src="fav.png" className="logo_fav" alt="logo_fav"/>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                ))}
                </div>
            </div>
        </div>
    </div>
    )
};