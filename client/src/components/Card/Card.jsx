import React from "react";
import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";
import PathRoutes from "../../Helpers/Routes.Helpers";

// Objeto que mapea los colores para cada tipo de Pokémon
const typeColors = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

// Componente funcional "Card" para representar un Pokémon individual
function Card({ name, img, types, id }) {
  // Obtener el color de fondo del tipo de Pokémon
  const background = types ? typeColors[types[0]] : "#FFFFFF";

  // Renderización del componente
  return (
    <div className={styles.card} style={{ backgroundColor: background }}>
      {/* Imagen del Pokémon */}
      <img className={styles.img} src={img} alt="Pokemon" />

      {/* Enlace a la página de detalles del Pokémon */}
      <Link className={styles.link} to={PathRoutes.DETAIL.replace(":id", id)}>
        <h2 className={styles.h2}>{name}</h2>
      </Link>

      {/* ID del Pokémon */}
      <h2 className={styles.h2}>{id}</h2>

      {/* Tipos del Pokémon */}
      <h2 className={styles.types}>{types ? types.join(" - ") : types}</h2>
    </div>
  );
}

export default Card;
