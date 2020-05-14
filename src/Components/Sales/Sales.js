import React, { useState, useEffect } from 'react';
import '../Sales/sales.css'
import cacao from '../Stock/biscuit.jpg'
function Sale() {
  //state
  const [box, setBox] = useState([{
    name: "",
    description: "",
    id_box: 0
  }])
  const [display, setDisplay] = useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/box_recipe')
        .then(res => res.json())
        .then(data => setBox([...data]))
        }, [])
        const buyBox = (event) => {
            event.preventDefault();    
              setDisplay(true); 
            console.log(event.target.value)
                fetch('http://localhost:5000/sales', {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                      id_box: event.target.value
                    })
                })
                .then(res => res.json())
                .then(res => console.log(res))
                    setTimeout(() => {
                        setDisplay(false);
                    }, 1000);
                  }
      return (
       
        <div className='sales-box'>
           {display &&
            <div className="message">
                <article class={`message is-success`}>
                    <div class="message-header">
                        <p>Box generada</p>
                        <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        <p>Ingredientes quitados de stock</p>
                    </div>
                </article>
            </div>
           }
          <h1>Cajas listas para preparar</h1>
            <div className='box'>
            {box.map((type, index) => (
              <div className="card">
                <div className="card-image">
                  <figure className="image image is-3by2">
                    <img className="img-box" src={cacao} alt="Placeholder image"/>
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      {/* <figure className="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                      </figure> */}
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{type.name}</p>
                      <p className="subtitle is-6">Baking box: {type.id_box}</p>
                    </div>
                  </div>
                  <button
                    onClick={(event) => buyBox(event)}
                    value={type.id_box}
                    className="button is-primary">Preparar</button>
                </div>
              </div>
            ))}
            </div>
        </div>
      )
}
export default Sale
