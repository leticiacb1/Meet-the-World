import React, { useEffect, useState } from "react";
import './interests.css';
import { useNavigate, useLocation } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import useModal from "use-modal-element";

import Header from '../Header/header.js'
import loadGif from './loadingGif.gif'
import headerNews from './headerNews.jpeg'
import headerMusic from './headerMusic.jpeg'

const axios = require("axios");
const api_key = 'd35271b5512d5f4a4cb3e77e2aadbb34'
let serachIDlink = "https://www.youtube.com/embed/"


function Detalhes() {

    const navigate = useNavigate();
    const location = useLocation();

    let [modalType, setModalType] = useState('');
    let [modalButtonText, setModalButtonText] = useState('');
    let [modalAction, setModalAction] = useState(function(){console.log("hello world!")});

    const [Modal, toggleModal] = useModal({
        withBackground: {
          closable: true,
          scrollable: false,
          customClassName: "my-background",
        },
        withCloseButton: {
          type: 'default', // 'default', 'rounded', 'text' //para o favorite será: 'text'
          text: "",
          customClassName: "my-close-button",
        },
        withControlButton: {
          type: modalType, // 'default', 'outlined', 'text' //para o favorite será: 'text'
          text: modalButtonText,
          customClassName: "my-control-button",
        },
        additional: {
          customWrapperClassName: "",
          fullyShieldedMobile: true,
        },
      });

    const countryName = location.state.country;
    const username = location.state.username;
    const token = location.state.token;

    function clicouCopiar (){
        navigator.clipboard.writeText(linkModal);
        console.log("O valor do link copiado é: "+ linkModal)
        let buttom = document.querySelector("#root > div.o1fCJ4SPOOXey3sBbLEc.my-background.tl8x3L7ex3ReMzLpRLCE.D6oc2nB_FUdz4lzqrGmt > div > div:nth-child(4) > div > div > button");
        console.log(buttom);
        buttom.innerHTML = 'Copiado!';
        buttom.style.backgroundColor = 'green';
    }

    let [news, setNews] = useState(['']);
    let [musics, setMusics] = useState([]);
    let [linkModal, setLinkModal] = useState('');
    
    let [modalContentType, setModalContentType] = useState('');
    let [noticiaFavoritada, setNoticiaFavoritada] = useState(['']);
    let [musicaFavoritada, setMusicaFavoritada] = useState(['']);
    let [subtitleModal, setSubtitleModal] = useState('');
    let [titleModal, setTitleModal] = useState('');
    let [loading, setLoading] = useState(true)
    let [songNotSelected, setSongNotSelected] = useState(true);
    
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

    async function pegaYoutubeID(nomeDamusica, nomeDoArtista){
        setSongNotSelected(true);
        let response = await axios.get('https://simple-youtube-search.p.rapidapi.com/search', { params: {
            query: nomeDamusica+' '+nomeDoArtista, safesearch: 'false'},
            headers: {
            'X-RapidAPI-Host': 'simple-youtube-search.p.rapidapi.com',
            'X-RapidAPI-Key': '09d9de731fmshd33bae78ac7cd2cp17a01fjsn2d4af2cbc8e8'
            }
        });

        const id = response.data.results[0].id;
        console.log("O id da musica no YT é: "+ id);
        serachIDlink = "https://www.youtube.com/embed/" + id + "?autoplay=1";
        setSongNotSelected(false);

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
                console.log(article.title.split(/[ ,]+/)),
                auxiNews.push({ "title": article.title.split(/[ ,]+/).join(' '), "resume": article.summary.slice(0, 400), "media": article.media, "link": article.link })
            ))
            console.log("teste para ver se não há titles repetidos:")
            const filredOnce = [...new Map(auxiNews.map((article) => [article["title"], article])).values(),]
            setNews(filredOnce);
            console.log(auxiNews)

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

    async function favoritaMusica(nomeDamusica, nomeDoArtista, srcImg){
        axios({
            method:'post',
            url:`https://frozen-sierra-18977.herokuapp.com/api/musics/`, 
            data:{
                "titulo": nomeDamusica,
                "artista": nomeDoArtista,
                "img": srcImg, 
            },
            headers: {
                'Authorization': `Token ${token}`
              }
            }).then(
                (response)=>{
                    console.log(response)
                    
                    setMusicaFavoritada({"name":nomeDamusica, "artista":nomeDoArtista, "img":srcImg})
                    console.log("Favoritando musica")

                    setTitleModal("Favoritar");
                    setSubtitleModal("A música abaixo foi adiciana as favoritas:")
                    setModalContentType('music');
                    setModalType('text');
                    setModalButtonText("  ");
                    setModalAction(()=>console.log("Favoritar music"))
                    toggleModal();
            }, (e)=>{
                alert(e);
            })

    }

    function favoritaNews(img,title,content,link){
        axios({
            method:'post',
            url:"https://frozen-sierra-18977.herokuapp.com/api/newss/",
            headers:{
                'Authorization': `Token ${token}`
            },
            data:{
                "title":title,
                "content":content,
                "img":img,
                "link":link,
                "user":username
            },}).then(
                (response) => {
                    console.log(response)
                    //alert("Noticia favoritada !");
                    setNoticiaFavoritada({"title":title, "resume": content, "media":img, "link":link})
                    setTitleModal("Favoritar");
                    setSubtitleModal("A notícia abaixo foi adiciana as favoritas:")
                    setModalContentType('news');
                    setModalType('text');
                    setModalButtonText("  ");
                    setModalAction(()=>console.log("Favoritar news"))
                    toggleModal();
        
                }, (e) => {
                    console.log(e)
                }
            )
    }


    function backMap(){
        navigate('/home', {state:{username:username, token:token}})
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

    useEffect(()=>{
        console.log("SongNot selected: "+ songNotSelected)
    }, [songNotSelected])


    function activateModalAndUpdateLink(novoLink){
        setTitleModal("Compartilhar");
        setSubtitleModal("Copie o link abaixo para compartilhar essa notícia:");
        setModalContentType('link');
        setLinkModal(novoLink);
        console.log("O link novo do modal é: "+ linkModal);
        setModalButtonText('Copiar');
        setModalType('text');
        setModalButtonText("  ");
        console.log("O modal action é:");
        toggleModal();
        console.log("Estou rodando aqui")
        
        
        
    }


    return <div className="containerInterests">

        <Header goTo={backMap} username = {username} token = {token}></Header>

        { loading ? 
        
            <img src={loadGif} className="loadingGif"></img> : 

            <div className="containerNewsMusic">
                <div className="infosConteiner">
                    <div className="newsConteiner">
                        <div className="headerNews">
                            <img src={headerNews} style={{height:"3rem"}}></img>
                            <h1>{countryName}</h1>
                        </div>
                        <div className="newsCardConteiner">

                            {news.map((noticias, index) => (
                                <div className="newsCard" key={"noticias_" + index}>
                                    <div className="newsInfo">
                                        <button className="newsFavoriteButton" onClick={()=>favoritaNews(noticias.media, noticias.title, noticias.resume, noticias.link)}>
                                            <StarIcon  sx={{ color: "black" , fontSize: 15}} className="estrela"></StarIcon>
                                        </button>
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
                                        <button className="shareButton" onClick={()=>activateModalAndUpdateLink(noticias.link)}>SHARE</button>
                                    </div>
                                </div>

                            ))}

                        </div>
                    </div>
                    <Modal title={titleModal} subtitle={subtitleModal}>

                            {modalContentType == "link" ? 
                            <>
                            <input type="text" aria-live="polite" id="link" className="inputLink"  aria-invalid="false" value={linkModal}/>
                                <div className="divshareButton">
                                        <button className="copyLinkButton" onClick={()=>clicouCopiar()}>Copiar</button>
                                </div>
                            </> :
                            <>
                            {modalContentType == "news" ? 
                            <div className="newsCardFavorite" key={"noticias"}>
                                <div className="newsInfo">
                                    <img src={noticiaFavoritada.media} className="mediaNews" alt="newsImage" />
                                    <div className="contentTitle">
                                        <h4 className="newsTitle">{noticiaFavoritada.title}</h4>
                                    </div>
                                    <div className="contentResume">
                                        <div className="newsResume">{noticiaFavoritada.resume} </div>
                                    </div>
                                    <div className="tag">
                                        <a className="readmoreTagFav" href={noticiaFavoritada.link} target="_blank">Read more</a>
                                    </div>
                                </div>
                            </div>
                            :
                                <>
                                    <div className="musicCardFav">

                                    {musicaFavoritada.img == null ?
                                        <div className="photoDivFav">
                                            <img className="musicPhoto" src="https://e7.pngegg.com/pngimages/185/464/png-clipart-regulate-g-funk-era-g-funk-album-funk-music-album-drum-thumbnail.png" alt="CD"></img>
                                        </div> :
                                        <div className="photoDiv">
                                            <img className="musicPhoto" src={musicaFavoritada.img} alt="album"></img>
                                        </div>

                                    }
                                    <div className="musicInfoFav">
                                        <div className="divHeaderMusic">
                                            <div className="nameMusic">{musicaFavoritada.name}</div>
                                        </div>
                                        <div className="divContentPlay">
                                            <div className="nameArtistMusic">Artist : {musicaFavoritada.artista}</div>
                                        </div>
                                    </div>
                                    </div>
                                </> 
                            }
                            </>
                            }

                    </Modal>
                </div>
                <div className="musicConteiner">
                    <div className="headerMusic">
                        <img src={headerMusic} style={{height:"2rem"}}></img>
                        <h2>{countryName}</h2>
                    </div>
                    <div className="musiccardsConteiner">

                        {musics.map((musica, index) => (
                            <div className="musicCard" key={"musica_" + index}>

                                {musica.img == null ?
                                    <div className="photoDiv">
                                        <img className="musicPhoto" src="https://e7.pngegg.com/pngimages/185/464/png-clipart-regulate-g-funk-era-g-funk-album-funk-music-album-drum-thumbnail.png" alt="CD"></img>
                                    </div> :
                                    <div className="photoDiv" onClick={()=>pegaYoutubeID(musica.name, musica.artist)}>
                                        <img className="musicPhoto" src={musica.img} alt="album"></img>
                                    </div>

                                }
                                <div className="musicInfo">
                                    <div className="divHeaderMusic">
                                        <div className="nameMusic">{musica.name}</div>
                                        <button className="musicFavoriteButton" onClick={()=>favoritaMusica(musica.name, musica.artist, musica.img)}>
                                            <StarIcon  sx={{ color: "black" , fontSize: 15}} className="estrela"></StarIcon>
                                        </button>
                                    </div>
                                    <div className="divContentPlay">
                                        <div className="nameArtistMusic">Artist : {musica.artist}</div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    <div className="infoMusicPlayer">
                        <div className="instructiosPlayMusic"> 
                            <div className="helptext">Ouça as músicas Top5 do país! Clique na capa de uma música!</div>
                        </div>
                    </div>
                    { songNotSelected ? 
        
                    <div></div> : 

                    <div className="videoMusic">
                        <iframe
                            src= {serachIDlink}
                            frameborder="0"
                            allow="autoplay; encrypted-media"
                            allowfullscreen
                            title="video"
                        />{" "}
                    </div>
                    }
                    </div>
                </div>
                </div>
    }
        </div>;
}

export default Detalhes;

