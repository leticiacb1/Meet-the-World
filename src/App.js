import { BrowserRouter as Router , Route, Routes  } from "react-router-dom";
import './App.css';

import Login from './components/Login/login.js'

function App() {
  return (
    <div className="App">
      <Router>  
        <Routes >
          <Route exact path="/" element={<Login/>}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;