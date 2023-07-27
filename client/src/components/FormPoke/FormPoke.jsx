import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTypes, postPokemon } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import PathRoutes from "../../Helpers/Routes.Helpers";
import validate from "../../Validation/validation";
import styles from "../FormPoke/FormPoke.module.css";

export default function FormPoke() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [errors, setErrors] = useState();

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

  function handleDelte(tip) {
    setInput({
      ...input,
      type: input.type.filter((t) => t !== tip),
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
    const errorsx = validate(input);
    console.log(errorsx);
    setErrors(errorsx);

    // Verificamos si hay errores
    if (Object.keys(errorx).length > 0) {
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
      <div className={styles.contaForm}>
        <Link to={PathRoutes.HOME}>
          <button>Home</button>
        </Link>
        <h1>Crea tu Pokemon</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Nombre:</label>
            <input
              className={styles.input}
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Vida:</label>
            <input
              className={styles.input}
              type="number"
              value={input.hp}
              name="hp"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={styles.lab}>Ataque:</label>
            <input
              className={styles.input}
              type="number"
              value={input.attack}
              name="attack"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Defensa:</label>
            <input
              className={styles.input}
              type="number"
              value={input.defense}
              name="defense"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Velocidad:</label>
            <input
              className={styles.input}
              type="number"
              value={input.speed}
              name="speed"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>height:</label>
            <input
              className={styles.input}
              type="number"
              value={input.height}
              name="height"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>weight:</label>
            <input
              className={styles.input}
              type="number"
              value={input.weight}
              name="weight"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={styles.lab}>img:</label>
            <input
              className={styles.input}
              type="text"
              value={input.img}
              name="img"
              onChange={handleChange}
            />
          </div>
          <div>
            <select className={styles.select} onChange={handleSelect}>
              {types.map((type) => (
                <option key={type} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          {input.type.map((tip) => (
            <div className="divTipo">
              <p>{tip}</p>
              <button className="btnX" onClick={() => handleDelte(tip)}>
                x
              </button>
            </div>
          ))}
          <br />

          {console.log(input)}
          <button type="submit"> Crear Pokemon</button>
        </form>
      </div>
      <div className={styles.glass}>
        <h1>Mira el Pokemon</h1>

        {input.img ? (
          <img
            className={styles.imgPreview}
            src={input.img}
            alt="Foto del pokemon"
          />
        ) : null}
      </div>
    </div>
  );
}
