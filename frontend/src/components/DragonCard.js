import React from 'react'

const DragonCard = ({ dragon }, ) => {

  const imageName = dragon.name.split(' ').join('_');
  
    
  return (
    <div className="card col" style={{width: 18 + 'rem'}}>
      <img src={`images/${imageName}.webp`} className="card-img-top" alt={dragon.name} />
      <div className="card-body">
        <div>
          <div className='container row'>
            <h5 className="card-title my-2 col-9">{dragon.name}</h5>

            <div className='element-container my-2 col-3'>
              {dragon.element.map((element, index) => 
                <img key={index} src={`images/elements/Element_${element}.webp`} className='img-fluid mx-2' alt={element} />
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className='my-3'>Attacks</h3>
          <div className='skills-container row'>
            {dragon.attacks.map((skill, index) => 
              <div key={index} className='skill col'>
                <h5>{skill}</h5>
              </div>
            )}
          </div>
        </div>
        
          
      </div>
      
    </div>
  )
}

export default DragonCard