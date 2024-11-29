import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from "./layout/Navbar";
import Home from "./layout/Home"
import Dragons from "./layout/Dragons";
import Docs from "./layout/Docs";


function App() {

  const [dragons, setDragons] = useState([]);

    useEffect(() => {
        // Cambia la URL por la de tu API
        const fetchDragons = async () => {
            try {
                const response = await axios.get('https://dragon-city-api.onrender.com/dragons');
                setDragons(response.data); // Ajusta según cómo devuelva los datos tu API
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchDragons();
        
    }, []);
    
  return (
    <Router>
      
      <Navbar />
      <div className='container'>
        
        
        
        <Routes>
          {/* <Route path='*' element={<Error/>} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/dragons' element={<Dragons />} />
          <Route path='/docs' element={<Docs />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
