
import React, { useState, useEffect } from 'react';
import { MyContext } from '../context/MyProvider';

function SaveStock() {
  const { products } = React.useContext(MyContext);
  //state
  const [ingredient, setIngredient] = useState([])
  const [stock, setStock] = useState({
    name: "",
    expiration_date: "",
    kg: 0,
    id_ingredient: 1,
  })

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
            }).then(res => res.json())
              .then(res => {
                console.log(res)
              })
            }
      return(
        <div className="">
          { ingredient &&
            <form onSubmit={(event) => submitInfo(event)}>
                  <input
                    type="text"
                    value={stock.name}
                    onChange={(event) => setStock({ ...stock, name: event.target.value })} />
                  <input
                    value={stock.expiration_date}
                    onChange={(event) => setStock({ ...stock, expiration_date: event.target.value })} />
                  <input
                    type="number"
                    value={stock.kg}
                    onChange={(event) => setStock({ ...stock, kg: event.target.value })} />
                  <label
                    type="number"
                    value={stock.id_ingredient}
                    onChange={(event) => setStock({ ...stock, id_ingredient: event.target.value })} />
                    <select id="ingredient">
                      {ingredient.map((ingredient, index) =>
                        <option>{ingredient.id_ingredient}</option>
                      )}
                    </select>
                  <button
                    type="submit">
                    Log In
                  </button>
            </form>
          }
        </div>
  );

}



export default SaveStock;
