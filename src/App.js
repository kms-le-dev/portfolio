import './App.css';

import PortFolio from './Portfolio';
import Projet1 from './Projet1.js';
import Projet2 from './Projet2.js';
import Projet3 from './Projet3.js';
import Projet4 from './Projet4.js';
import Projet5 from './Projet5.js';
import Projet6 from './Projet6.js';
import Projet7 from './Projet7.js';
import Projet8 from './Projet8.js';
import Projet9 from './Projet9.js';
import Projet10 from './Projet10.js';
import Projet11 from './Projet11.js';
import Projet12 from './Projet12.js';




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
        <Route path="/projet5" element={<Projet5/>} />
        <Route path="/projet6" element={<Projet6/>} /> 
        <Route path="/projet7" element={<Projet7/>} /> 
        <Route path="/projet8" element={<Projet8/>} /> 
        <Route path="/projet9" element={<Projet9/>} /> 
        <Route path="/projet10" element={<Projet10/>} /> 
        <Route path="/projet11" element={<Projet11/>} /> 
        <Route path="/projet12" element={<Projet12/>} />  
      </Routes>
    </Router>
  );
}

export default App;
