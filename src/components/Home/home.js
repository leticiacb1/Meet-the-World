import React from "react";
import './home.css';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import GitHubIcon from '@mui/icons-material/GitHub';
import pointerImg from './pointer.png';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Map, Marker, Popup } from 'react-leaflet'
import { useNavigate , useLocation} from "react-router-dom";

const axios = require("axios");

const paisesComCoordenadas = [

{'name':'United Arab Emirates',  'coordenadas': 
[23.424076, 53.847818]
}
,
{'name':'Afghanistan',  'coordenadas': 
[3.3939109999999997, 67.709953]
}

,
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
{'name':'Aruba',  'coordenadas': 
[12.524409310258479, -69.95936363625735]
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
{'name':'Bahrain',  'coordenadas': 
[25.930414, 50.637772]
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
{'name':'Bhutan',  'coordenadas': 
[27.514162, 90.433601]
}
,
{'name':'Bouvet Island',  'coordenadas': 
[-54.423199, 3.413194]
}
,
{'name':'Botswana',  'coordenadas': 
[-22.328474, 24.684866]
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
{'name':'Cocos [Keeling] Islands',  'coordenadas': 
[-12.164164999999999, 96.87095599999999]
}
,
{'name':'Central African Republic',  'coordenadas': 
[6.611110999999999, 20.939443999999998]
}
,
{'name':'Switzerland',  'coordenadas': 
[46.818188, 8.227511999999999]
}
,
{'name':'Cook Islands',  'coordenadas': 
[-21.236736, -159.777671]
}
,
{'name':'Chile',  'coordenadas': 
[-35.675146999999996, -71.542969]
}
,
{'name':'China',  'coordenadas': 
[3.586166, 104.195397]
}
,
{'name':'Colombia',  'coordenadas': 
[4.570868, -74.297333]
}
,
{'name':'Costa Rica',  'coordenadas': 
[9.748916999999999, -83.753428]
}
,
{'name':'Cuba',  'coordenadas': 
[21.521756999999997, -77.781167]
}
,
{'name':'Cape Verde',  'coordenadas': 
[16.002081999999998, -24.013196999999998]
}
,
{'name':'Christmas Island',  'coordenadas': 
[-10.447524999999999, 105.690449]
}
,
{'name':'Cyprus',  'coordenadas': 
[35.126413, 33.429859]
}
,
{'name':'Germany',  'coordenadas': 
[51.165690999999995, 10.451526]
}
,
{'name':'Djibouti',  'coordenadas': 
[11.825137999999999, 42.590275]
}
,
{'name':'Algeria',  'coordenadas': 
[28.033886, 1.6596259999999998]
}
,
{'name':'Ecuador',  'coordenadas': 
[-1.8312389999999998, -78.18340599999999]
}
,
{'name':'Estonia',  'coordenadas': 
[58.595271999999994, 25.013607]
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
[6.192411, 25.748151]
}
,
{'name':'Fiji',  'coordenadas': 
[-16.578193, 179.414413]
}
,
{'name':'Falkland Islands [Islas Malvinas]',  'coordenadas': 
[-51.796253, -59.523613]
}
,
{'name':'Micronesia',  'coordenadas': 
[7.425554, 150.55081199999998]
}
,
{'name':'Faroe Islands',  'coordenadas': 
[61.892635, -6.9118059999999995]
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
{'name':'South Georgia and the South Sandwich Islands',  'coordenadas': 
[-54.429579, -36.587908999999996]
}

,
{'name':'Hong Kong',  'coordenadas': 
[22.396428, 114.10949699999999]
}
,
{'name':'Heard Island and McDonald Islands',  'coordenadas': 
[-5.308180999999999, 73.50415799999999]
}
,
{'name':'Haiti',  'coordenadas': 
[18.971187, -72.285215]
}

,
{'name':'Indonesia',  'coordenadas': 
[-7.89275e-07, 113.92132699999999]
}
,
{'name':'Ireland',  'coordenadas': 
[53.1424, 7.6921]
}
,
{'name':'Israel',  'coordenadas': 
[31.046051, 34.851611999999996]
}
,
{'name':'India',  'coordenadas': 
[20.593684, 7.896287999999999]
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
{'name':'Kyrgyzstan',  'coordenadas': 
[4.120438, 74.766098]
}
,
{'name':'Cambodia',  'coordenadas': 
[12.565679, 104.990963]
}
,
{'name':'Comoros',  'coordenadas': 
[-11.875001, 43.872219]
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
{'name':'Cayman Islands',  'coordenadas': 
[19.513469, -80.56695599999999]
}
,
{'name':'Kazakhstan',  'coordenadas': 
[48.019573, 66.923684]
}
,
{'name':'Lesotho',  'coordenadas': 
[-29.609987999999998, 28.233608]
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
{'name':'Marshall Islands',  'coordenadas': 
[7.131474, 171.18447799999998]
}
,
{'name':'Myanmar [Burma]',  'coordenadas': 
[21.913964999999997, 95.956223]
}
,
{'name':'Mongolia',  'coordenadas': 
[46.862496, 103.846656]
}
,
{'name':'Malta',  'coordenadas': 
[35.937495999999996, 14.375416]
}
,
{'name':'Mauritius',  'coordenadas': 
[-20.348404, 57.552152]
}
,
{'name':'Maldives',  'coordenadas': 
[1.924992, 73.399658]
}
,
{'name':'Malawi',  'coordenadas': 
[-13.254308, 34.301525]
}
,
{'name':'Mexico',  'coordenadas': 
[23.634501, -102.55278399999999]
}
,
{'name':'Malaysia',  'coordenadas': 
[4.210484, 101.975766]
}
,
{'name':'Mozambique',  'coordenadas': 
[-18.665695, 35.529562]
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
{'name':'Nicaragua',  'coordenadas': 
[12.865416, -85.207229]
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
{'name':'Nauru',  'coordenadas': 
[-5.227779999999999e-07, 166.931503]
}
,
{'name':'Niue',  'coordenadas': 
[-19.054444999999998, -169.867233]
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
{'name':'French Polynesia',  'coordenadas': 
[-17.679742, -149.40684299999998]
}
,
{'name':'Papua New Guinea',  'coordenadas': 
[-6.314992999999999, 14.395555]
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
{'name':'Russia',  'coordenadas': 
[6.152400999999999, 105.318756]
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
{'name':'Saint Helena',  'coordenadas': 
[-24.143473999999998, -10.030695999999999]
}
,
{'name':'Slovakia',  'coordenadas': 
[48.669025999999995, 19.699023999999998]
}

,
{'name':'Senegal',  'coordenadas': 
[14.497401, -14.452361999999999]
}
,
{'name':'Somalia',  'coordenadas': 
[5.152149, 46.199616]
}
,
{'name':'Suriname',  'coordenadas': 
[3.919305, -56.027783]
}
,
{'name':'Syria',  'coordenadas': 
[34.802074999999995, 38.996815]
}
,
{'name':'Chad',  'coordenadas': 
[15.454165999999999, 18.732207]
}
,
{'name':'French Southern Territories',  'coordenadas': 
[-49.280366, 69.348557]
}
,
{'name':'Togo',  'coordenadas': 
[8.619543, 8.24782e-07]
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
{'name':'Tokelau',  'coordenadas': 
[-8.967362999999999, -171.85588099999998]
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
{'name':'Tonga',  'coordenadas': 
[-21.178986, -175.198242]
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
[3.709024, -95.712891]
}
,
{'name':'Uruguay',  'coordenadas': 
[-32.522779, -55.765834999999996]
}
,
{'name':'Uzbekistan',  'coordenadas': 
[41.377491, 64.585262]
}
,
{'name':'Vietnam',  'coordenadas': 
[14.058323999999999, 108.277199]
}
,
{'name':'Vanuatu',  'coordenadas': 
[-15.376705999999999, 166.959158]
}
,
{'name':'Yemen',  'coordenadas': 
[15.552726999999999, 48.516388]
}
,
{'name':'Mayotte',  'coordenadas': 
[-0.128275, 45.166244]
}
,
{'name':'South Africa',  'coordenadas': 
[-30.559482, 22.937506]
}
,
{'name':'Zambia',  'coordenadas': 
[-13.133897, 27.849332]
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
        console.log("_________Notícia_______");
        console.log("Data de publicação: "+ response.data.articles[0].published_date);
        console.log("Título: "+response.data.articles[0].title);
        console.log("Resumo: "+response.data.articles[0].summary);
        console.log(response.data.articles[0].media);
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
      }).catch(function (error) {
          console.error(error);
      });
}


//http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=YOUR_API_KEY&format=json

function Mapa(){
  const navigate = useNavigate();
  const location = useLocation();

  function goToDetails(name){
    console.log("Indo para a proxima página");
    navigate('/interests', {state: {country: name}} );
  }    

    return(
            
            <div className="containerMap">
              <div className="header">
                <h3 className="headerContent">Random Word</h3>
                <div className="divIconsHeader">
                  <AccountCircleSharpIcon sx={{ color: "white" }} fontSize="large" ></AccountCircleSharpIcon>
                  <GitHubIcon sx={{ color: "white" }} fontSize="large"></GitHubIcon>
                </div>
              </div>
              <div className="screenMap">
                <MapContainer className="map" center={[32, 10]} zoom={1.5} scrollWheelZoom={false} zoomControl={false} dragging={true} >
                <TileLayer className="teste2"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {paisesComCoordenadas.map((e)=>{
                return(
                    <Marker position={e.coordenadas} icon={pointIcon}>
                        <Popup>
                            <a onClick={()=>goToDetails(e.name)}>{e.name}</a>
                        </Popup>
                    </Marker>
                );})}
                
                </MapContainer>
              </div>
            </div>
    )
}

export default Mapa;