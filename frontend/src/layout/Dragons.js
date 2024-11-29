import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import DragonCard from '../components/DragonCard';

const Dragons = () => {

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
  console.log(dragons)

  return (
    <div className='grid-cards-contariner row row-cols-md-3'>
      {dragons.map((dragon, index) => (
        <DragonCard key={index} dragon={dragon} />
      ))}
    </div>
  )
}

export default Dragons