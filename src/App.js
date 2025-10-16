import './App.css';

import PortFolio from './Portfolio';
import Projet1 from './Projet1.js';
import Projet2 from './Projet2.js';
import Projet3 from './Projet3.js';
import Projet4 from './Projet4.js';
import EnCours from './encours.js';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortFolio />}/>
        <Route path="/projet1" element={<Projet1/>} />
        <Route path="/projet2" element={<Projet2/>} />
        <Route path="/projet3" element={<Projet3/>} />
        <Route path="/projet4" element={<Projet4/>} />
        <Route path="/projet5" element={<EnCours/>} />
        <Route path="/projet6" element={<EnCours/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
