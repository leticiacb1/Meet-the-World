import { BrowserRouter as Router , Route, Routes  } from "react-router-dom";
import './App.css';

import Login from './components/Login/login.js'
import Mapa from './components/Mapa/mapa.js'

function App() {
  return (
    <div className="App">
      <Router>  
        <Routes >
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/mapa" element={<Mapa/>}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;