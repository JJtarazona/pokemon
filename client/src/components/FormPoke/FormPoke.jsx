import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTypes, postPokemon } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import PathRoutes from "../../Helpers/Routes.Helpers";
import validate from "../../Validation/validation"; // Importamos la función validate

export default function FormPoke() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    type: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Realizamos las validaciones
    const errors = validate(input);

    // Verificamos si hay errores
    if (Object.keys(errors).length > 0) {
      // Si hay errores, mostramos los mensajes de error
      alert(
        "Por favor, corrige los siguientes errores:\n" + JSON.stringify(errors)
      );
    } else {
      // Si no hay errores, enviamos los datos al servidor
      dispatch(postPokemon(input));
      alert("Pokemon creado");
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: "",
        type: [],
      });
    }
  }

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div>
      <Link to={PathRoutes.HOME}>
        <button>Home</button>
      </Link>
      <h1>Crea tu Pokemon</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Vida:</label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ataque:</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={handleChange}
          />
          <div>
            <label>Defensa:</label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Velocidad:</label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>height:</label>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>weight:</label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>img:</label>
            <input
              type="text"
              value={input.img}
              name="img"
              onChange={handleChange}
            />
          </div>
          <div>
            <select onChange={handleSelect}>
              {types.map((type) => (
                <option key={type} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <ul>
              <li>{input.type.map((el) => el + " ,")}</li>
            </ul>
          </div>
        </div>
        {console.log(input)}
        <button type="submit"> Crear Pokemon</button>
      </form>
    </div>
  );
}
