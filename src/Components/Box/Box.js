import React, { useState, useEffect} from 'react';
//import './Home.css';
import './Box.css';



const Box = () => {
   // var ingredientsQuantity = []; 
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
        let cosa = {ingredient:data.ingredient, quantity:data.quantity}
        setQuantityIngredients( cosa)
        console.log(quantityIngredients)
    }

    //Submit button
    const submitInfo = (event) => {
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
	            ingredients_quantity: [{
		            ingredient: data.ingredient,
		            quantity: data.quantity
                }]
            }) 
        })
        .then(res => res.json())
        .then(res => {
          console.log(res)
        })
       
       

    }

    return(
    <div className="box-container">
        
        <h1>Box</h1>
        {ingredient&&
        <div>
                <form onSubmit={(event) => submitInfo(event)}>

                    <label>Box Recipe Name:</label>
                    <input type="text"  onChange={(event) => updateData({ ...data, name: event.target.value })}></input>

                    <label>Description:</label>
                    <textarea onChange={(event) => updateData({ ...data, description: event.target.value })}></textarea>
                    <br/>
                    
                <button type="submit">Create Recipe</button>
                
                </form>
                <form onSubmit={(event) => addIngredients(event)}>
                        <label>Select ingredients:</label>
                        <select onChange={(event) => updateData({ ...data, ingredient: event.target.value })}>
                            {ingredient.map(ingredient=>{
                                return(
                                    <option value={ingredient.id_ingredient} key={ingredient.id_ingredient}>{ingredient.name}</option>
                            )})}  
                        </select>

                    <label>Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="100" onChange={(event) => updateData({ ...data, quantity: event.target.value })}></input>
                    <button type="submit">Add ingredient</button>
                    <div>{data.ingredient}</div>
                </form>
                </div>}
            
    </div>
    )
    }


export default Box;
