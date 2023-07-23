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

function Home() {
  const dispatch = useDispatch();
  const allPokemon = useSelector((state) => state.pokemons);
  const all = useSelector((state) => state.types);
  const types = useSelector((state) => state.types);
  const [orderPokemon, setOrderPokemon] = useState([]);

  const [pokLoaded, setPokLoaded] = useState(all.length ? true : false);
  const [order, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = Array.isArray(allPokemon)
    ? allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon)
    : [allPokemon];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(pageNumber);
  };

  useEffect(() => {
    if (!pokLoaded) {
      dispatch(getPokemon());
      setPokLoaded(true);
      dispatch(getTypes());
    }
  }, [pokLoaded, dispatch]);

  function handleFilterTypesByType(event) {
    dispatch(filterPokemonsByType(event.target.value));
    setOrderPokemon([...orderPokemon, event.target.value]);
  }

  function handleFilterCreate(event) {
    dispatch(filterCreater(event.target.value));
    setOrderPokemon([...orderPokemon, event.target.value]);
  }

  function handleOrderByName(event) {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrderPokemon([...orderPokemon, event.target.value]);
    setOrder(`Ordenado ${event.target.value}`);
  }

  function handleOrderAttack(event) {
    dispatch(orderByAttack(event.target.value));
    setCurrentPage(1);
    setOrderPokemon([...orderPokemon, event.target.value]);
    setOrder(`Ordenado attack`);
  }

  return (
    <div className={styles.container}>
      {/* <button onClick={(e) => handleClick(e)}>Boton de mierda</button> */}
      <div>
        <div>
          <select onChange={(event) => handleOrderByName(event)}>
            <option value=" ">Ordenar por nombre</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select onChange={(event) => handleOrderAttack(event)}>
            <option value=" ">Ordenar por ataque</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select onChange={(event) => handleFilterTypesByType(event)}>
            <option value="All">Todos los tipos</option>
            {types.map((type) => (
              <option value={type.name} key={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          <select onChange={handleFilterCreate}>
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
        {currentPokemon?.map((pokemon) => (
          <div>
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
  );
}

export default Home;
