import React from "react";
import './home.css';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import GitHubIcon from '@mui/icons-material/GitHub';
import pointerImg from './pointer.png';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Map, Marker, Popup } from 'react-leaflet'
import { useNavigate , useLocation} from "react-router-dom";
import Header from '../Header/header.js'
  
const axios = require("axios");

const paisesComCoordenadas = [
{'name':'Angola',  'coordenadas': 
[-11.202691999999999, 17.873887]
}
,
{'name':'Antarctica',  'coordenadas': 
[-75.250973, -7.138899999999999e-08]
}
,
{'name':'Argentina',  'coordenadas': 
[-38.416097, -63.616671999999994]
}
,
{'name':'Australia',  'coordenadas': 
[-25.274397999999998, 133.775136]
}
,
{'name':'Azerbaijan',  'coordenadas': 
[40.143105, 47.576927]
}
,
{'name':'Bangladesh',  'coordenadas': 
[23.684994, 90.356331]
}
,
{'name':'Brunei',  'coordenadas': 
[4.535277, 114.72766899999999]
}
,
{'name':'Bolivia',  'coordenadas': 
[-16.290153999999998, -63.588652999999994]
}
,
{'name':'Brazil',  'coordenadas': 
[-15.748357, -47.893657]
}
,
{'name':'Belarus',  'coordenadas': 
[53.709807, 27.953388999999998]
}
,
{'name':'Belize',  'coordenadas': 
[17.189877, -8.849765]
}
,
{'name':'Canada',  'coordenadas': 
[56.130365999999995, -106.34677099999999]
}
,
{'name':'Central African Republic',  'coordenadas': 
[6.611110999999999, 20.939443999999998]
}
,
{'name':'Chile',  'coordenadas': 
[-35.675146999999996, -71.542969]
}
,
{'name':'China',  'coordenadas': 
[34.643671, 103.612776]
}
,
{'name':'Colombia',  'coordenadas': 
[4.570868, -74.297333]
}
,
{'name':'Costa Rica',  'coordenadas': 
[9.934739, -84.087502]
}
,
{'name':'Cuba',  'coordenadas': 
[21.521756999999997, -77.781167]
}
,
{'name':'Germany',  'coordenadas': 
[51.165690999999995, 10.451526]
}
,
{'name':'Ecuador',  'coordenadas': 
[-1.8312389999999998, -78.18340599999999]
}
,
{'name':'Egypt',  'coordenadas': 
[26.820553, 30.802498]
}
,
{'name':'Eritrea',  'coordenadas': 
[15.179383999999999, 39.782334]
}
,
{'name':'Spain',  'coordenadas': 
[40.463667, -0.374922]
}
,
{'name':'Ethiopia',  'coordenadas': 
[0.009145, 40.489672999999996]
}
,
{'name':'Finland',  'coordenadas': 
[60.1699, 24.9384]
}
,
{'name':'Micronesia',  'coordenadas': 
[7.425554, 150.55081199999998]
}
,
{'name':'France',  'coordenadas': 
[46.227638, 2.213749]
}
,
{'name':'United Kingdom',  'coordenadas': 
[55.378051, -3.4359729999999997]
}
,
{'name':'Greenland',  'coordenadas': 
[71.706936, -42.604303]
}
,
{'name':'Greece',  'coordenadas': 
[39.074208, 21.824312]
}

,
{'name':'Hong Kong',  'coordenadas': 
[22.396428, 114.10949699999999]
}
,
{'name':'Indonesia',  'coordenadas': 
[-6.20199, 106.829]
}
,
{'name':'Israel',  'coordenadas': 
[32.0452, 34.7698]
}
,
{'name':'India',  'coordenadas': 
[28.61, 77.23]
}

,
{'name':'Iraq',  'coordenadas': 
[33.223191, 43.679291]
}
,
{'name':'Iran',  'coordenadas': 
[32.427907999999995, 53.688046]
}
,
{'name':'Iceland',  'coordenadas': 
[64.963051, -19.020834999999998]
}
,
{'name':'Italy',  'coordenadas': 
[41.902782, 12.496366]
}
,
{'name':'Japan',  'coordenadas': 
[36.204823999999995, 138.252924]
}
,
{'name':'North Korea',  'coordenadas': 
[40.339852, 127.510093]
}
,
{'name':'South Korea',  'coordenadas': 
[35.907757, 127.766922]
}
,
{'name':'Kazakhstan',  'coordenadas': 
[48.019573, 66.923684]
}
,
{'name':'Morocco',  'coordenadas': 
[31.791701999999997, -0.709262]
}
,
{'name':'Moldova',  'coordenadas': 
[47.411631, 28.369885]
}
,
{'name':'Madagascar',  'coordenadas': 
[-18.766947, 46.869107]
}
,
{'name':'Mongolia',  'coordenadas': 
[46.862496, 103.846656]
}
,
{'name':'Maldives',  'coordenadas': 
[1.924992, 73.399658]
}
,
{'name':'Mexico',  'coordenadas': 
[23.634501, -102.55278399999999]
}
,
{'name':'New Caledonia',  'coordenadas': 
[-20.904305, 165.618042]
}


,
{'name':'Nigeria',  'coordenadas': 
[9.081999, 8.675277]
}
,
{'name':'Norway',  'coordenadas': 
[60.472024, 8.468945999999999]
}
,
{'name':'Nepal',  'coordenadas': 
[28.394857, 84.12400799999999]
}
,
{'name':'New Zealand',  'coordenadas': 
[-40.900557, 174.88597099999998]
}
,
{'name':'Peru',  'coordenadas': 
[-9.189967, -75.015152]
}

,
{'name':'Philippines',  'coordenadas': 
[12.879721, 121.774017]
}
,
{'name':'Pakistan',  'coordenadas': 
[30.375321, 69.34511599999999]
}
,
{'name':'Poland',  'coordenadas': 
[51.919438, 19.145136]
}

,
{'name':'Puerto Rico',  'coordenadas': 
[18.220833, -66.590149]
}
,
{'name':'Portugal',  'coordenadas': 
[39.399871999999995, -8.224454]
}
,
{'name':'Paraguay',  'coordenadas': 
[-23.442503, -58.443832]
}
,
{'name':'Russian Federation',  'coordenadas': 
[63.346501, 94.077145]
}
,
{'name':'Rwanda',  'coordenadas': 
[-1.940278, 29.873887999999997]
}
,
{'name':'Saudi Arabia',  'coordenadas': 
[23.885942, 45.079162]
}
,
{'name':'Solomon Islands',  'coordenadas': 
[-0.964571, 160.156194]
}
,
{'name':'Seychelles',  'coordenadas': 
[-4.679574, 55.491977]
}
,
{'name':'Sudan',  'coordenadas': 
[12.862807, 30.217636]
}
,
{'name':'Sweden',  'coordenadas': 
[60.128161, 18.643501]
}
,
{'name':'Singapore',  'coordenadas': 
[1.352083, 103.819836]
}
,
{'name':'Somalia',  'coordenadas': 
[5.152149, 46.199616]
}
,
{'name':'Suriname',  'coordenadas': 
[5.839398,  -55.199089]
}
,
{'name':'Chad',  'coordenadas': 
[15.454165999999999, 18.732207]
}
,
{'name':'Thailand',  'coordenadas': 
[15.870032, 100.99254099999999]
}
,
{'name':'Tajikistan',  'coordenadas': 
[38.861034, 71.276093]
}
,
{'name':'Timor-Leste',  'coordenadas': 
[-8.874217, 125.727539]
}
,
{'name':'Turkmenistan',  'coordenadas': 
[38.969719, 59.556278]
}
,
{'name':'Tunisia',  'coordenadas': 
[33.886917, 9.537499]
}
,
{'name':'Turkey',  'coordenadas': 
[38.963744999999996, 35.243322]
}

,
{'name':'Taiwan',  'coordenadas': 
[2.3697809999999997, 120.960515]
}

,
{'name':'United States',  'coordenadas': 
[37.09024, -95.712891]
}
,
{'name':'Uruguay',  'coordenadas': 
[-32.522779, -55.765834999999996]
}
,
{'name':'Vietnam',  'coordenadas': 
[14.058323999999999, 108.277199]
}
,
{'name':'Yemen',  'coordenadas': 
[15.552726999999999, 48.516388]
}
,
{'name':'South Africa',  'coordenadas': 
[-30.559482, 22.937506]
}
,
{'name':'Zimbabwe',  'coordenadas': 
[-19.015438, 29.154857]
}
]

var pointIcon = L.icon({
    iconUrl: pointerImg,

    iconSize: [38, 38], // size of the icon
    
});

function pegaNoticias(nomeDoPais){
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
      }).catch(function (error) {
          console.error(error);
      });

      const options2 = {
        method: 'GET',
        url: 'http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country='+nomeDoPais.toLowerCase()+'&api_key='+api_key+'&format=json',
      };

      axios.request(options2).then(function (response) {
      }).catch(function (error) {
          console.error(error);
      });
}


//http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=YOUR_API_KEY&format=json

function Mapa(){
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state.username;
  const token = location.state.token;
  console.log("O token recebido na home foi: "+token);
  

  function goToDetails(name){
    navigate('/interests', {state: {country: name, username : username, token: token}} );
  }    

  function goToPerfil(){
    console.log("Cliqueiiii")
    navigate('/favorits')
  }

    return(
            <>
              <div className="containerMap">

                
                <Header condicao="None" goTo="None"></Header>
                <div className="screenMap">
                  <MapContainer className="map" center={[32, 0]} zoom={1.5} scrollWheelZoom={false} zoomControl={true} dragging={true} >
                  <TileLayer className="teste2"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />


                  {paisesComCoordenadas.map((e, index)=>{
                  return(
                      <Marker position={e.coordenadas} icon={pointIcon} key={"marker_"+index}>
                          <Popup>
                              <a onClick={()=>goToDetails(e.name)}>{e.name}</a>
                          </Popup>
                      </Marker>
                  );})}
                  
                  </MapContainer>
                </div>
              </div>
            </>
          
    )
}

export default Mapa;