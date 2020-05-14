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
        ingredient_name: "",
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
        setQuantityIngredients(oldArray => [...oldArray, {ingredient:data.ingredient, ingredient_name: data.ingredient_name, quantity:data.quantity} ])
        updateData({ ...data, ingredient:"", quantity:""})
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
                ingredient_name: data.ingredient_name,
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
            ingredient_name: "",
            quantity:""})

            setQuantityIngredients([])
    }

    return (
        <div className="box-container">
            {display &&
                <div className="message">
                    <article className={`message is-success`}>
                        <div className="message-header">
                            <p>Guardado!</p>
                            <button className="delete" aria-label="delete"></button>
                        </div>
                        <div className="message-body">
                            Has añadido {`${data.name}`}
                        </div>
                    </article>
                </div>
            }
            <div className="title-stock">
                <h1>Crea tu Box</h1>
            </div>
            {ingredient&&
                <div className="container-insert-stock">
                    <form onSubmit={(event) => createRecipe(event)}>
                        <div  className="field">
                            <label>Nombre de tu receta Box:</label>
                            <div className="control">
                                <input
                                    placeholder="Producto"
                                    className="input"
                                    type="text"
                                    value={data.name}
                                    onChange={(event) => updateData({ ...data, name: event.target.value })}
                                />
                            </div>
                        </div>

                        <div className='field-row'>
                            <div className="field" >
                                <label>Cantidad:</label>
                                <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="0"
                                    max="100"
                                    value={data.quantity}
                                    onChange={(event) => updateData({ ...data, quantity: event.target.value })}
                                />
                            </div>
                        </div>
                            <div className="field" >
                                <label>Selecciona los ingredientes:</label>
                                <div className="control">
                                    <select
                                        className="select"
                                        onChange={(event) => updateData({ ...data, ingredient: event.target.value, ingredient_name: event.target.value})}
                                    >
                                        <option value={''} key={''}></option>
                                        {ingredient.map(ingredient=>{
                                            return(
                                                <option
                                                    value={ingredient.id_ingredient, ingredient.name}
                                                    key={ingredient.id_ingredient, ingredient.name}
                                                >
                                                {ingredient.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <button
                                // style={{marginBottom:'12px'}}
                                className="button is-link"
                                onClick={(event) => addIngredients(event)}>Añade un ingrediente >>
                            </button>
                        </div>

                        <div className="field">
                            <label>Descripción:</label>
                            <div className="control">
                                <textarea
                                value={data.description}
                                className="textarea"
                                onChange={(event) => updateData({ ...data, description: event.target.value })}/>
                            </div>
                        </div>

                        <div className="control submit-button">
                            <button
                                type="submit"
                                className="button is-link"
                            >
                                Crear Box
                            </button>
                        </div>
                    </form>
                    {quantityIngredients!=="" &&
                        <div className='added_ingredients'>
                            <h4>Ingridientes añadidos:</h4>
                            {quantityIngredients.map(ingredient=>{
                                return(
                                    <ul>
                                        <li key={ingredient.ingredient}>{ingredient.ingredient} // {ingredient.quantity}</li>
                                    </ul>
                                )
                            })}
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Box;
