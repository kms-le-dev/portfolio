import './App.css';

import { useEffect } from 'react';
import HomeLayout from './Layout/HomeLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  useEffect(() => {
    document.documentElement.lang = 'fr';
    document.documentElement.dir = 'ltr';
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />}/>
      </Routes>
    </Router>
  );
}

export default App;
