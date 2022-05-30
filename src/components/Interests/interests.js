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
            response.data.articles.slice(1,).map((article) => (
                auxiNews.push({"title": article.title, "content": article.summary, "data":article.published_date, "link":article.link})
                ))
            setNews(auxiNews);
                

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
            console.log("img: "+response.data.tracks.track[0].image[1]['#text']);
            console.log(response.data.tracks.track);
            // auxiMusics.push({"name": response.data.tracks.track[0].name, "artista":response.data.tracks.track[0].artist.name, "img":response.data.tracks.track[0].image[1]['#text'] });
            // setMusics(auxiMusics);
            {response.data.tracks.track.map((track) => (
                auxiMusics.push({"name": track.name, "artista": track.artist.name, "img": track.image[1]['#text']})
            ))}
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
              <div className="centraliza_pais">
                  <h1>{countryName}</h1>
              </div>
            <div className="perfilOptions">
                <img className="persona" src={"https://www.promoview.com.br/uploads/2017/04/b72a1cfe.png"} alt="persona"></img>
                <button className="logoutButton">Sair</button>
            </div>
          </div>
      </div>
    <div className="infosConteiner">
    <div className="newsConteiner">
        <div className="headerNews"><h2>News</h2></div>
            <div className="newsCardConteiner">
               
                {news.map((noticias) => (
                    <div className="newsCard" key={`noticias__${noticias.content}`}>
                        <div className="newsInfo">
                        <h2>{noticias.title}</h2>
                        <p>{noticias.content}</p>
                    </div>
                    <div className="shareButton">
                        <button className="logoutButton" onClick={() => axios
                        .post("http://127.0.0.1:8000/api/newss/", { "title": noticias.title, "content": noticias.content, "data":noticias.data, "link":noticias.link})
                        .then((res)=>{
                        console.log("Postou!")
                        })}>
                        SHARE
                        </button>
                        </div>
                </div>
                                
                ))}

        </div>
     </div>
     <div className="musicConteiner">
        <div className="headerMusic"><h2>Top Musics</h2></div>
            <div className="musiccardsConteiner">

                {musics.map((musica) => (
                    <div className="musicCard" key={`musica__${musica.name}`}>
                    <div className="photoDiv">
                        <img className="musicPhoto" src={musica.img}></img>
                    </div>
                    <div className="musicInfo">
                        <h4>{musica.name}</h4>
                        <h4>{musica.artista}</h4>
                        <button className="musicFavoriteButton" onClick={() => axios
                        .post("http://127.0.0.1:8000/api/musics/", { "titulo": musica.name, "artista": musica.artista, "img":musica.img})
                        .then((res)=>{
                        console.log("Postou!")
                        })}>
                            Favoritar
                        </button>
                    </div>
                </div>
                                
                ))}
            </div>
    </div>
  </div>
  </div>;
}

export default Detalhes;
