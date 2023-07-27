import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import PathRoutes from "../../Helpers/Routes.Helpers";
import style from "../Detail/Detail.module.css";
import pokebola from "../../Image/pokebol.gif";

export default function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Variable de estado para controlar el estado de carga
  const dispatch = useDispatch();

  useEffect(() => {
    // Cuando se monte el componente, establecer loading en true y obtener los detalles del Pokémon
    setLoading(true);
    dispatch(getDetail(id))
      .then(() => setLoading(false)) // Cuando se complete la carga, establecer loading en false
      .catch(() => setLoading(false)); // En caso de error también establecer loading en false
  }, [dispatch, id]);

  const poke = useSelector((state) => state.detail);

  return (
    <div className={style.container}>
      {loading ? (
        // Si loading es true, mostrar el mensaje de carga
        <img src={pokebola} alt="Loading..." className={style.pokebola} />
      ) : poke ? (
        // Si loading es false y los datos están disponibles, mostrar el detalle del Pokémon
        <div className={style.pokemonContainer}>
          <h2>ID: {poke.id}</h2>
          <div className={style.imageContainer}>
            <img
              src={poke.front_default ? poke.front_default : poke.img}
              alt="Pokemón"
              className={style.pokemonImage}
            />
            <h1 className={style.pokemonName}>{poke.name}</h1>
          </div>
          <div className={style.statsContainer}>
            <div>
              <h3>Vida: {poke.hp}</h3>
              <h3>Ataque: {poke.attack}</h3>
            </div>
            <div>
              <h3>Defensa: {poke.defense}</h3>
              <h3>Velocidad: {poke.speed}</h3>
            </div>
            <div>
              <h3>Peso: {poke.weight}</h3>
              <h3>Altura: {poke.height}</h3>
            </div>
          </div>
          <div className={style.typesConatiner}>
            <h2>Tipo: {poke.types ? poke.types.join(" - ") : poke.types}</h2>
          </div>
        </div>
      ) : (
        // Si loading es false pero no hay datos disponibles, mostrar un mensaje de error
        <p>Error: No se pudo cargar el detalle del Pokémon</p>
      )}

      <Link to={PathRoutes.HOME}>
        <button>Volver</button>
      </Link>
    </div>
  );
}
