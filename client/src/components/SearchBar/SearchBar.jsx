import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../redux/actions";
import style from "./SearchBar.module.css";

// export default function SearchBar() {
//   const dispatch = useDispatch();
//   const [name, setName] = useState("");

//   const handleInputChange = (event) => {
//     event.preventDefault();
//     setName(event.target.value);
//     console.log(name);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(getNamePokemon(name));
//   };

//   return (
//     <div>
//       <input
//         type="search"
//         placeholder="Buscar Pokemon"
//         onChange={(event) => handleInputChange(event)}
//       />
//       <button type="submit" onClick={(event) => handleSubmit(event)}>
//         Buscar
//       </button>
//     </div>
//   );
// }

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " "));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== "") {
      dispatch(getNamePokemon(name));
      setName("");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Buscar Pokemon..."
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Buscar
        </button>
      </form>
    </div>
  );
}
