import React, { useState, useEffect } from 'react';

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
                    }, 5000);
                  }

      return (
        <div>
          <h1>Cajas</h1>
            <div>
            {box.map((type, index) => (
              <div className="card">
                <div className="card-image">
                  <figure className="image image is-3by2">
                    <img className="img-box" src="https://bulma.io/images/placeholders/480x320.png" alt="Placeholder image"/>
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{type.name}</p>
                      <p className="subtitle is-6">Baking box: {type.id_box}</p>
                    </div>
                  </div>

                  <div className="content">
                    {type.description}
                  </div>
                  <button
                    onClick={(event) => buyBox(event)}
                    value={type.id_box}
                    className="button is-primary">Comprar</button>
                </div>
              </div>
            ))}

            </div>


        </div>



      )



}

export default Sale
