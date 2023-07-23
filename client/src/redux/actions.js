import axios from "axios";

export function getPokemon() {
  return async function (dispatch) {
    const { data } = await axios.get("http://localhost:3001/pokemons", {});

    return dispatch({
      type: "GET_POKEMONS",
      payload: data,
    });
  };
}

export function getTypes() {
  return async function (dispatch) {
    const { data } = await axios.get("http://localhost:3001/types", {});

    return dispatch({
      type: "GET_TYPES",
      payload: data,
    });
  };
}

export function getNamePokemon(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/pokemons?name=" + name
      );
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterPokemonsByType(payload) {
  return {
    type: "FILTER_BY_TYPES",
    payload,
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/pokemons/",
        payload
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCreater(payload) {
  return {
    type: "FILTER_CREATE",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      console.log(id);
      const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`);
      console.log(data);

      return dispatch({
        type: "GET_DETAIL",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
