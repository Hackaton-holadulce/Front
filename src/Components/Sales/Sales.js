import React, { useState, useEffect } from 'react';

function Sale() {
  //state
  const [box, setBox] = useState([{
    name: "",
    description: "",
    id_box: 0,
  }])
  const [display, setDisplay] = useState(false)


    useEffect(() => {
        fetch('http://localhost:5000/box_recipe')
        .then(res => res.json())
        .then(data => setBox([...data]))
        }, [])

        const submitInfo = (event) => {
            event.preventDefault();
                fetch('http://localhost:5000/sales', {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                      id_sales: box.id_sales,
                      id_box: box.id_box
                    })
                })
                .then(res => res.json())
                .then(res => setDisplay(true))
                    setTimeout(() => {
                        setDisplay(false);
                    }, 5000);
        }

      return (
        <div>
          <h1>Cajas</h1>
            <div>
            {box.map((type, index) => (
              <div class="card">
                <div class="card-image">
                  <figure class="image image is-3by2">
                    <img className="img-box" src="https://bulma.io/images/placeholders/480x320.png" alt="Placeholder image"/>
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">{type.name}</p>
                      <p class="subtitle is-6">Baking box: {type.id_box}</p>
                    </div>
                  </div>

                  <div class="content">
                    {type.description}
                  </div>
                </div>
              </div>
            ))}

            </div>


        </div>



      )



}

export default Sale
