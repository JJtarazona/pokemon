import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Por favor, ingrese el nombre del Pokémon.");
      return;
    }

    try {
      const response = await dispatch(getNamePokemon(name));
      if (!response) {
        alert("No se encontró ningún Pokémon con ese nombre.");
      }
    } catch (error) {
      alert("Hubo un error al buscar el Pokémon.");
    }
    setName("");
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className={styles.input}
          type="text"
          placeholder="Buscar Pokémon..."
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
        <button className={styles.buscar} type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
}
