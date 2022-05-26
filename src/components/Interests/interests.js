import React, {useEffect, useState} from "react";
import './interests.css';
import { useNavigate , useLocation} from "react-router-dom";

const axios = require("axios");


function Detalhes() {

    const navigate = useNavigate();
    const location = useLocation();

    const countryName = location.state.country;


    let [news, setNews] = useState(['']);
    let [musics, setMusics] = useState(['']);

    async function pegaNoticias(nomeDoPais){
        var auxiNews = [];
        var auxiMusics = [];
        console.log("Pegando notícias na função...");
        const api_key = 'd35271b5512d5f4a4cb3e77e2aadbb34'
        const options = {
            method: 'GET',
            url: 'https://free-news.p.rapidapi.com/v1/search',
            params: {q: nomeDoPais, lang: 'en'},
            headers: {
              'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
              'X-RapidAPI-Key': '09d9de731fmshd33bae78ac7cd2cp17a01fjsn2d4af2cbc8e8'
            }
          };
          
          axios.request(options).then(function (response) {
            console.log("_________Notícia_______");
            console.log("Data de publicação: "+ response.data.articles[0].published_date);
            console.log("Título: "+response.data.articles[0].title);
            console.log("Resumo: "+response.data.articles[0].summary);
            console.log(response.data.articles);
            auxiNews.push({"title": response.data.articles[0].title, "resume": response.data.articles[0].summary})
            setNews(auxiNews);
            response.data.articles.slice(1,).map((article) => (
                auxiNews.push({"title": article.title, "resume": article.summary})
            ))
    

          }).catch(function (error) {
              console.error(error);
          });
    
          const options2 = {
            method: 'GET',
            url: 'http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country='+nomeDoPais.toLowerCase()+'&api_key='+api_key+'&format=json',
          };
    
          axios.request(options2).then(function (response) {
            console.log("_________Música _______");
            console.log("Nome da música: "+response.data.tracks.track[0].name);
            console.log("Artista: "+response.data.tracks.track[0].artist.name);
            console.log("Ouvintes: "+response.data.tracks.track[0].listeners);
            console.log(response.data.tracks.track);
            auxiMusics.push({"name": response.data.tracks.track[0].name});
            setMusics(auxiMusics);
            response.data.tracks.track.slice(1,).map((track) => (
                auxiMusics.push({"name": track.name})
            ))
            setMusics(auxiMusics);
          }).catch(function (error) {
              console.error(error);
          });
    }
    

    useEffect(()=>{
        pegaNoticias(countryName);
    },[]);





  return <div>
      <div className="Header">
          <div className="divExtra">
            <div className="perfilOptions">
                <button className="logoutButton">SHARE</button>
                <img className="persona" src="https://www.promoview.com.br/uploads/2017/04/b72a1cfe.png" alt="persona"></img>
                <h3 className="username">Perfil</h3>
            </div>
          </div>
      </div>
    <div className="infosConteiner">
    <div className="newsConteiner">
        <div className="headerNews"><h2>News</h2></div>
            <div className="newsCardConteiner">
               
                {news.map((noticias) => (
                    <div className="newsCard">
                        <div className="newsInfo">
                        <h2>{noticias.title}</h2>
                        <p>{noticias.resume}</p>
                    </div>
                    <div className="shareButton">
                        <button className="logoutButton">SHARE</button>
                    </div>
                </div>
                                
                ))}

        </div>
     </div>
     <div className="musicConteiner">
        <div className="headerMusic"><h2>Top Musics</h2></div>
            <div className="musiccardsConteiner">

                {musics.map((musica) => (
                    <div className="musicCard">
                    <div className="photoDiv">
                        <img className="musicPhoto" src="https://e7.pngegg.com/pngimages/185/464/png-clipart-regulate-g-funk-era-g-funk-album-funk-music-album-drum-thumbnail.png"></img>
                    </div>
                    <div className="musicInfo">
                        <h4>{musica.name}</h4>
                        <button className="musicFavoriteButton">Favoritar</button>
                    </div>
                </div>
                                
                ))}
            </div>
    </div>
  </div>
  </div>;
}

export default Detalhes;

