import React, { useState, useEffect } from 'react';
import './Stock.css';

function SaveStock() {
  //state

  const [ingredient, setIngredient] = useState([])
  const [getdb, setGetdb] = useState([])
  const [stock, setStock] = useState({
    name: "",
    expiration_date: "",
    kg: 0,
    id_ingredient: 1,
  })
  const [display, setDisplay] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/ingredient')
        .then(res => res.json())
        .then(data => setIngredient([...data]))
        }, [])

    const submitInfo = (event) => {
        event.preventDefault();
            fetch('http://localhost:5000/stock_ingredients', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                name: stock.name,
                expiration_date: stock.expiration_date,
                kg: stock.kg,
                id_ingredient: stock.id_ingredient
                })
            })
            .then(res => res.json())
            .then(res => setDisplay(true))
            setTimeout(() => {
                setDisplay(false);
            }, 5000);

    }


    useEffect(() => {
      fetch('http://localhost:5000/stock_ingredients')
      .then(res => res.json())
      .then(data => setGetdb(data))
    }, [])


    return (
        <div>
            {display &&
                <div className="message">
                    <article class={`message is-success`}>
                        <div class="message-header">
                            <p>Guardado!</p>
                            <button class="delete" aria-label="delete"></button>
                        </div>
                        <div class="message-body">
                            Has añadido {`${stock.name}`}
                        </div>
                    </article>
                </div>
            }
            <div className="title-stock">
                <h1>Añadir a mi stock</h1>
            </div>
            <div className="container-insert-stock">
                { ingredient &&
                    <form onSubmit={(event) => submitInfo(event)}>
                        <div className="field">
                            <label className="label">Nombre</label>
                            <div className="control">
                            <input
                                placeholder="Producto"
                                className="input"
                                type="text"
                                value={stock.name}
                                onChange={(event) => setStock({ ...stock, name: event.target.value })} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Fecha de caducidad</label>
                            <div className="control">
                            <input
                                placeholder="AAAA-MM-DD"
                                className="input"
                                type="text"
                                value={stock.expiration_date}
                                onChange={(event) => setStock({ ...stock, expiration_date: event.target.value })} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Cantidad</label>
                            <div className="control">
                            <input
                                placeholder="en Kg"
                                className="input"
                                type="number"
                                value={stock.kg}
                                onChange={(event) => setStock({ ...stock, kg: event.target.value })} />
                            </div>
                        </div>

                        <div className="field">
                            <label
                                className="label"
                                value={stock.id_ingredient}
                                onChange={(event) => setStock({ ...stock, id_ingredient: event.target.value })}>
                                Código del producto
                            </label>
                            <div className="control">
                                <div className="select">
                                    <select id="ingredient">
                                        {ingredient.map((ingredient, index) =>
                                            <option>{ingredient.id_ingredient}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="control submit-button">
                            <button type="submit" className="button is-link">Añadir producto a mi stock</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export default SaveStock;

