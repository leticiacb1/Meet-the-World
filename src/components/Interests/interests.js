import React, { useEffect, useState } from "react";
import './interests.css';
import { useNavigate, useLocation } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';

import Header from '../Header/header.js'
import loadGif from './loadingGif.gif'

const axios = require("axios");
const api_key = 'd35271b5512d5f4a4cb3e77e2aadbb34'


function Detalhes() {
    const navigate = useNavigate();
    const location = useLocation();
    const countryName = location.state.country;

    let [news, setNews] = useState(['']);
    let [musics, setMusics] = useState([]);
    let [loading, setLoading] = useState(true)

    async function pegaMusicas(nomeDoPais) {
        let response = await axios.get('http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=' + nomeDoPais.toLowerCase() + '&api_key=' + api_key + '&format=json', { params: { limit: 6 } });
        const auxiMusics = response.data.tracks.track.slice(1,).map((track) => (
            { "name": track.name, "artist": track.artist.name }
         
        ))

        console.log(response)

        let musicsWithImg = await getImages(auxiMusics);
        setLoading(false)
        
        return musicsWithImg
    }

    async function pegaNoticias(nomeDoPais) {

        const auxiNews = [];

        const options = {
            method: 'GET',
            url: 'https://free-news.p.rapidapi.com/v1/search',
            params: { q: nomeDoPais, lang: 'en' },
            headers: {
                'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
                'X-RapidAPI-Key': '09d9de731fmshd33bae78ac7cd2cp17a01fjsn2d4af2cbc8e8'
            }
        };

        axios.request(options).then(function (response) {

            response.data.articles.map((article) => (
                auxiNews.push({ "title": article.title, "resume": article.summary.slice(0, 300), "media": article.media, "link": article.link })
            ))

            setNews(auxiNews);
        }).catch(function (error) {
            console.error(error);
        });

    }

    async function getImages(tracks) {
        const auxiMusics = [];
        for (const track of tracks) {
            const res = await axios.get('https://deezerdevs-deezer.p.rapidapi.com/search', {
                params: { q: track.name + " " + track.artist }, headers: {
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
                    'X-RapidAPI-Key': '09d9de731fmshd33bae78ac7cd2cp17a01fjsn2d4af2cbc8e8',
                }
            });
            try {
                auxiMusics.push({ "name": track.name, "artist": track.artist, "img": res.data.data[0].album.cover })
            }
            catch {
                auxiMusics.push({ "name": track.name, "artist": track.artist })
            }
        }

        return auxiMusics;
    }

    function goToPerfil() {
        navigate('/favorits')
    }

    function backMap(){
        navigate('/home')
    }

    useEffect(() => {
        pegaNoticias(countryName);
        pegaMusicas(countryName).then(
            (response) => {
                setMusics(response);
            }
        );
    }, []);

    useEffect(() => {
        console.log(musics)
    }, [musics])

    return <div className="containerInterests">

        <Header goTo={backMap}></Header>

        { loading ? 
        
            <img src={loadGif} className="loadingGif"></img> : 

            <div className="containerNewsMusic">
                <div className="infosConteiner">
                    <div className="newsConteiner">
                        <div className="headerNews"><h2>News</h2></div>
                        <div className="newsCardConteiner">

                            {news.map((noticias, index) => (
                                <div className="newsCard" key={"noticias_" + index}>
                                    <div className="newsInfo">
                                        <img src={noticias.media} className="mediaNews" alt="newsImage" />
                                        <div className="contentTitle">
                                            <h4 className="newsTitle">{noticias.title}</h4>
                                        </div>
                                        <div className="contentResume">
                                            <div className="newsResume">{noticias.resume} </div>
                                        </div>

                                        <a className="readmoreTag" href={noticias.link} target="_blank">Read more</a>
                                    </div>
                                    <div className="divshareButton">
                                        <button className="shareButton">SHARE</button>
                                    </div>
                                </div>

                            ))}

                        </div>
                    </div>

                </div>
                <div className="musicConteiner">
                    <div className="headerMusic"><h2>Top Musics</h2></div>
                    <div className="musiccardsConteiner">

                        {musics.map((musica) => (
                            <div className="musicCard" key={musica.title}>

                                {musica.img == null ?
                                    <div className="photoDiv">
                                        <img className="musicPhoto" src="https://e7.pngegg.com/pngimages/185/464/png-clipart-regulate-g-funk-era-g-funk-album-funk-music-album-drum-thumbnail.png" alt="CD"></img>
                                    </div> :
                                    <div className="photoDiv">
                                        <img className="musicPhoto" src={musica.img} alt="album"></img>
                                    </div>

                                }
                                <div className="musicInfo">
                                    <div className="divHeaderMusic">
                                        <div className="nameMusic">{musica.name}</div>
                                        <button className="musicFavoriteButton">
                                            <StarIcon  sx={{ color: "black" , fontSize: 15}}></StarIcon>
                                        </button>
                                    </div>
                                    <div className="divContentPlay">
                                        <div className="nameArtistMusic">Artist : {musica.artist}</div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                </div>
    }
        </div>;
}

export default Detalhes;

