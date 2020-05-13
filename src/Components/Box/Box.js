import React, { useState, useEffect} from 'react';
//import './Home.css';
import '../Stock/Stock.css';


const Box = () => {
    const [display, setDisplay] = useState(false)
    const [ingredient, setIngredient]=useState()
    const [data, updateData] = useState({
        name: "",
        description: "",
        ingredient: "",
        quantity:""
    })

   const [quantityIngredients, setQuantityIngredients]=useState([])

    useEffect(()=>{
        //return all ingredients
        fetch(`http://localhost:5000/ingredient`)
        .then(res=>res.json())
        .then(data=>setIngredient(data))
    }, [])


    //Submit ingredients button
    const addIngredients = (event) => {
        event.preventDefault();
       // quantityIngredients.push({ingredient:data.ingredient, quantity:data.quantity})
        setQuantityIngredients(oldArray => [...oldArray, {ingredient:data.ingredient, quantity:data.quantity} ])
    }

    //Submit button
    const createRecipe = (event) => {
        event.preventDefault();

        console.log('adding recipe')
        fetch('http://localhost:5000/box_recipe', {
            method: 'POST',
            // mode: "no-cors",
            headers:new Headers({
                'Content-Type': 'application/json'
              }),
            body: JSON.stringify({
                name: data.name,
	            description: data.description,
	            // ingredients_quantity: [{
		        //     ingredient: data.ingredient,
		        //     quantity: data.quantity
                // }]
                ingredients_quantity: quantityIngredients
            })
        })

        .then(res => res.json())
        .then(res => setDisplay(true))
            setTimeout(() => {
                setDisplay(false);
            }, 5000);
            updateData({
            name: "",
            description: "",
            ingredient: "",
            quantity:""})



    }

    return(
    <div className="box-container">
        {display &&
                <div className="message">
                    <article class={`message is-success`}>
                        <div class="message-header">
                            <p>Guardado!</p>
                            <button class="delete" aria-label="delete"></button>
                        </div>
                        <div class="message-body">
                            Has añadido {`${data.name}`}
                        </div>
                    </article>
                </div>
            }
        <div className="title-stock">
            <h1>Box Creator</h1>
        </div>
        {ingredient&&
        <div className="container-insert-stock">
            <form onSubmit={(event) => createRecipe(event)}>
                <div  className="field">
                    <label>Box Recipe Name:</label>
                    <div className="control">
                    <input
                        placeholder="Producto"
                        className="input"
                        type="text"
                        onChange={(event) => updateData({ ...data, name: event.target.value })}/>
                    </div>
                </div>

                <div className='field-row'>
                <div className="field" >
                    <label>Quantity:</label>
                    <div className="control">
                    <input
                        className="input"
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="100"
                        onChange={(event) => updateData({ ...data, quantity: event.target.value })}/>
                    </div>
                    </div>
                    <div className="field" >
                    <label>Select ingredients:</label>
                    <div className="control">
                    <select
                        className="select"
                        onChange={(event) => updateData({ ...data, ingredient: event.target.value })}>
                            <option value={''} key={''}></option>
                            {ingredient.map(ingredient=>{
                            return(
                                <option value={ingredient.id_ingredient} key={ingredient.id_ingredient}>{ingredient.name}</option>
                            )})}
                    </select>
                    </div>
                    </div>
                    <button style={{marginBottom:'12px'}}
                        className="button is-link"
                        onClick={(event) => addIngredients(event)}>Add ingredient</button>


                </div>

                <div className="field">
                    <label>Description:</label>
                    <div className="control">
                    <textarea
                        className="textarea"
                        onChange={(event) => updateData({ ...data, description: event.target.value })}/>
                    </div>
                </div>

                <div class="control submit-button">
                    <button
                        type="submit" className="button is-link"
                        >Create Box</button>
                </div>
                </form>
                {quantityIngredients!=="" &&
                <div className='added_ingredients'>
                    <h4>Added ingridients:</h4>
                    {quantityIngredients.map(ingredient=>{
                        return(
                            <ul>
                            <li key={ingredient.ingredient}>{ingredient.ingredient} // {ingredient.quantity}</li>
                            </ul>
                        )
                    })}
               </div>
               }
                </div>}

    </div>
    )
    }


export default Box;
