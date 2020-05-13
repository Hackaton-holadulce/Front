<div className="field">
  <label className="label">Name</label>
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
        value={stock.id_ingredient}
        onChange={(event) => setStock({ ...stock, id_ingredient: event.target.value })} />
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
