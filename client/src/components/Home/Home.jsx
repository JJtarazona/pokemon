import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemon,
  filterPokemonsByType,
  getTypes,
  filterCreater,
  orderByName,
  orderByAttack,
} from "../../redux/actions";
import styles from "../Home/Home.module.css";
import Paginated from "../Paginated/Paginated";
import reiniciar from "../../Image/reiniciar.png";

function Home() {
  // Redux useDispatch y useSelector para interactuar con el estado global
  const dispatch = useDispatch();

  // Estado local del componente
  const allPokemon = useSelector((state) => state.pokemons);
  const all = useSelector((state) => state.types);
  const types = useSelector((state) => state.types);
  const [orderPokemon, setOrderPokemon] = useState([]);
  const [order, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = Array.isArray(allPokemon)
    ? allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon)
    : [allPokemon];

  // Función para cambiar la página actual en la paginación
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(pageNumber);
  };

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Despachar las acciones para obtener los tipos y los Pokémon
    dispatch(getTypes());
    dispatch(getPokemon());
  }, [dispatch]);

  // Manejador de evento para el botón de reinicio
  function handleClick(event) {
    event.preventDefault();
    dispatch(getPokemon());
  }

  // Manejador de evento para filtrar Pokémon por tipo
  function handleFilterTypesByType(event) {
    dispatch(filterPokemonsByType(event.target.value));
    setOrderPokemon([...orderPokemon, event.target.value]);
  }

  // Manejador de evento para filtrar Pokémon por origen (Api o Created)
  function handleFilterCreate(event) {
    dispatch(filterCreater(event.target.value));
    setOrderPokemon([...orderPokemon, event.target.value]);
  }

  // Manejador de evento para ordenar Pokémon por nombre
  function handleOrderByName(event) {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrderPokemon([...orderPokemon, event.target.value]);
    setOrder(`Ordenado ${event.target.value}`);
  }

  // Manejador de evento para ordenar Pokémon por ataque
  function handleOrderAttack(event) {
    dispatch(orderByAttack(event.target.value));
    setCurrentPage(1);
    setOrderPokemon([...orderPokemon, event.target.value]);
    setOrder(`Ordenado attack`);
  }
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={(event) => handleClick(event)}>
        <div>
          {" "}
          <img src={reiniciar} alt="" />{" "}
        </div>
        <div>
          <h3>Reiniciar</h3>
        </div>
      </button>
      <div>
        <div>
          <select
            className={styles.select}
            onChange={(event) => handleOrderByName(event)}
          >
            <option value=" ">Ordenar por nombre</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select
            className={styles.select}
            onChange={(event) => handleOrderAttack(event)}
          >
            <option value=" ">Ordenar por ataque</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select
            className={styles.select}
            onChange={(event) => handleFilterTypesByType(event)}
          >
            <option value="All">Todos los tipos</option>
            {types?.map((type) => (
              <option value={type.name} key={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          <select className={styles.select} onChange={handleFilterCreate}>
            <option value="All">All</option>
            <option value="Api">API</option>
            <option value="Created">Created</option>
          </select>
        </div>
        <Paginated
          pokemonPerPage={pokemonPerPage}
          allPokemons={allPokemon}
          paginate={paginate}
        />
        <div className={styles.cards}>
          {currentPokemon?.map((pokemon) => (
            <div className={styles.card}>
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                img={pokemon.img}
                types={pokemon.types}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
