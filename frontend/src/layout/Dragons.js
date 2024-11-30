import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import DragonCard from '../components/DragonCard';

const Dragons = () => {

  const [dragons, setDragons] = useState([]);
  const [filteredDragons, setFilteredDragons] = useState([]);
  const [selectedElement, setSelectedElement] = useState("")

  useEffect(() => {

    // get data
    const fetchDragons = async () => {
        try {
            const response = await axios.get('https://dragon-city-api.onrender.com/dragons');
            setDragons(response.data);
            setFilteredDragons(response.data)
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    fetchDragons();
      
  }, []);
  console.log(dragons)

  // dragon filter
  useEffect(() => {
    if (selectedElement === "") {
      setFilteredDragons(dragons);
    } else {
      const filtered = dragons.filter((dragon) => 
        dragon.element.includes(selectedElement)
      );
      setFilteredDragons(filtered);
    }
  
  }, [selectedElement, dragons])
  
  // filter handler
  const handleElementChange = (e) => {
    setSelectedElement(e.target.value);
  };

  return (
    <div className='dragons-container container-fluid'>

      <div className="selec-container form-floating filter" data-bs-theme="dark">
        
        <select id='floatingSelect' className="form-select" aria-label="Floating label select example"
        value={selectedElement} onChange={handleElementChange}>
          <option value={""}>All</option>
          <option value={"Terra"}>Terra</option>
          <option value={"Flame"}>Flame</option>
          <option value={"Sea"}>Sea</option>
          <option value={"Nature"}>Nature</option>
          <option value={"Electric"}>Electric</option>
          <option value={"Ice"}>Ice</option>
          <option value={"Metal"}>Metal</option>
          <option value={"Dark"}>Dark</option>
          <option value={"Light"}>Light</option>
          <option value={"War"}>War</option>
          <option value={"Pure"}>Pure</option>
          <option value={"Legend"}>Legend</option>
        </select>
        <label htmlFor='floatingSelect'>Filter by element</label>
      </div>
      

      <div className='grid-cards-container row row-cols-2 row-cols-md-3'>
        {filteredDragons.map((dragon, index) => (
          <DragonCard key={index} dragon={dragon} />
        ))}
      </div>
    </div>
      
  )
}

export default Dragons