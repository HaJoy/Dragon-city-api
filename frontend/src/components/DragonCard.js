import React from 'react'
import { Link } from 'react-router-dom'

const DragonCard = ({ dragon }) => {
  const imageName = dragon.name.split(' ').join('_');
  return (
    <div className="card col" style={{width: 18 + 'rem'}}>
        <img src={`images/${imageName}.webp`} className="card-img-top" alt={dragon.name} />
        <div className="card-body">
            <h5 className="card-title">{dragon.name}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <Link to={`/dragons/:${dragon._id}`} className="btn btn-primary">Ver habilidades</Link>
        </div>
    </div>
  )
}

export default DragonCard