import { BrowserRouter as Router , Route, Routes  } from "react-router-dom";
import './App.css';

import Login from './components/Login/login.js'
import Register from './components/Register/register.js'
import Home from './components/Home/home.js'
import Interests from './components/Interests/interests.js'
import Favorites from './components/Favorites/favorites.js'

function App() {
  return (
    <div className="App">
      <Router>  
        <Routes >
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/interests" element={<Interests/>}/>
          <Route exact path="/favorites" element={<Favorites/>}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;