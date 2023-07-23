import React from "react";
import stiles from "../Paginated/Paginated.module.css";

function Paginated({ pokemonPerPage, allPokemons, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={stiles.nav}>
      <ul className={stiles.ul}>
        {pageNumbers.map((number) => (
          <li className={stiles.li} key={number}>
            <button className={stiles.button} onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Paginated;
