const initialState = {
  pokemons: [],
  types: [],
  allPokemon: [],
  detail: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        allPokemon: action.payload, // Actualiza el estado allPokemon con los pokemones obtenidos
        pokemons: action.payload,
      };

    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "FILTER_BY_TYPES":
      const allPokemon = state.allPokemon; // Utiliza el estado allPokemon para filtrar
      const filteredPokemon =
        action.payload === "All"
          ? allPokemon
          : allPokemon.filter((element) =>
              element.types.includes(action.payload)
            );

      return {
        ...state,
        pokemons: filteredPokemon.length
          ? filteredPokemon
          : [{ name: `${action.payload} Pokemons` }],
      };

    // case "FILTER_CREATE":
    //   const allPokemon2 = state.allPokemon;
    //   const statusFiltered2 =
    //     action.payload === "Created"
    //       ? allPokemon2.filter((element) => element.createdInDb)
    //       : allPokemon2.filter((element) => !element.createdInDb);
    //   return {
    //     ...state,
    //     pokemons: statusFiltered2,
    //   };

    case "FILTER_CREATE":
      const allPokemon2 = state.allPokemon;
      console.log("allPokemon2:", allPokemon2);

      const statusFiltered2 =
        action.payload === "Created"
          ? allPokemon2.filter((element) => element.createdInDb)
          : action.payload === "Api"
          ? allPokemon2.filter((element) => !element.createdInDb)
          : allPokemon2;
      return {
        ...state,
        pokemons: statusFiltered2,
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };

    case "ORDER_BY_NAME":
      const sortedArr =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
              return 0;
            });

      return {
        ...state,
        pokemons: sortedArr,
      };

    case "GET_DETAIL": {
      return {
        ...state,
        detail: action.payload,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
