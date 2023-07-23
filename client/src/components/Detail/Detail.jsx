import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";
import PathRoutes from "../../Helpers/Routes.Helpers";
import style from "../Detail/Detail.module.css";

export default function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const poke = useSelector((state) => state.detail);

  return (
    <div className={style.container}>
      {poke ? (
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
            <h2>Tipo: {poke.types ? poke.types.join(" - ") : ""}</h2>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Link to={PathRoutes.HOME}>
        <button>Volver</button>
      </Link>
    </div>
  );
}
