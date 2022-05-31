import React, {useEffect, useState} from "react";
import './interests.css';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate , useLocation} from "react-router-dom";

const axios = require("axios");
const api_key = 'd35271b5512d5f4a4cb3e77e2aadbb34'


function Detalhes() {
    const navigate = useNavigate();
    const location = useLocation();
    const countryName = location.state.country;

    let [news, setNews] = useState(['']);
    let [musics, setMusics] = useState(['']);

    async function pegaMusicas(nomeDoPais){
        let response = await axios.get('http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country='+nomeDoPais.toLowerCase()+'&api_key='+api_key+'&format=json');
        let auxiMusics = [];
        response.data.tracks.track.slice(1,).map((track) => (
                auxiMusics.push({"name": track.name, "artist": track.artist.name})
        ))
        //setMusics(auxiMusics);
        console.log("Função pegaMusicas:")
        console.log(auxiMusics);
        console.log("Chamando a função pega imagens...");
        getImages(auxiMusics);
    }

    async function pegaNoticias(nomeDoPais){
       
        var auxiNews = [];
        console.log("Pegando notícias na função...");
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
            auxiNews.push({"title": response.data.articles[0].title, "resume": response.data.articles[0].summary, "media": response.data.articles[0].media})
            setNews(auxiNews);
            response.data.articles.slice(1,).map((article) => (
                auxiNews.push({"title": article.title, "resume": article.summary, "media": article.media})
            ))

          }).catch(function (error) {
              console.error(error);
          });

    }
    

    useEffect(()=>{
        pegaNoticias(countryName);
        pegaMusicas(countryName);
        
    },[]);


    async function getImages(tracks){
        var auxiMusics = [];

        console.log("Entrou na função que pega imagens");
        console.log("O que eu recebi de argumento foi: ");
        console.log(tracks)

        let response;
        tracks.map(async function(track){
            console.log("Pesquisando: "+track.name +" "+ track.artist);
            response = await axios.get('https://deezerdevs-deezer.p.rapidapi.com/search', {params: {q: track.name +" "+ track.artist}, headers: {
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
                'X-RapidAPI-Key': '09d9de731fmshd33bae78ac7cd2cp17a01fjsn2d4af2cbc8e8',
              }});
            // console.log(response);
            try{
            auxiMusics.push({"name": track.name, "artist": track.artist, "img": response.data.data[0].album.cover})
            }
            catch{
                auxiMusics.push({"name": track.name, "artist": track.artist})
            }
            })
        
        console.log(auxiMusics);
        setMusics(auxiMusics);
        console.log("Terminou de rodar a função que pega imagens");
        console.log(musics);
    }

  return <div>
      <div className="header">
        <h3 className="headerContent">Random Word</h3>
        <div className="divIconsHeader">
            <AccountCircleSharpIcon sx={{ color: "white" }} fontSize="large" ></AccountCircleSharpIcon>
            <GitHubIcon sx={{ color: "white" }} fontSize="large"></GitHubIcon>
        </div>
      </div>

      <div className="musicConteiner">
        <div className="headerMusic"><h2>Top Musics</h2></div>
            <div className="musiccardsConteiner">

                {musics.map((musica) => (
                    <div className="musicCard">

                    {musica.img == null ? 
                        <div className="photoDiv">
                            <img className="musicPhoto" src="https://e7.pngegg.com/pngimages/185/464/png-clipart-regulate-g-funk-era-g-funk-album-funk-music-album-drum-thumbnail.png" alt="CD"></img>
                        </div> : 
                        <div className="photoDiv">
                            <img className="musicPhoto" src={musica.img} alt="album"></img>
                        </div>
                    
                    }
                    <div className="musicInfo">
                        <h4>{musica.name}</h4>
                        <button className="musicFavoriteButton">Favoritar</button>
                    </div>
                </div>
                                
                ))}
            </div>
        </div>
    <div className="infosConteiner">
    <div className="newsConteiner">
        <div className="headerNews"><h2>News</h2></div>
            <div className="newsCardConteiner">
               
                {news.map((noticias) => (
                    <div className="newsCard">
                        <div className="newsInfo">
                            <img src={noticias.media} className="mediaNews" alt="newsImage"/>
                            <h4 className="newsTitle">{noticias.title}</h4>
                            <div className="newsResume">{noticias.resume}</div>
                        </div>
                        <div className="shareButton">
                            <button className="logoutButton">SHARE</button>
                        </div>
                    </div>
                                
                ))}

        </div>
     </div>
     
  </div>
  </div>;
}

export default Detalhes;

