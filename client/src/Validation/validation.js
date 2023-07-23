const validate = (input) => {
  const patterns = {
    name: {
      pattern: /^[a-zA-Z ]{1,30}$/,
      errorMessage:
        "El nombre debe contener solo letras y tener entre 1 y 30 caracteres.",
    },
    hp: {
      pattern: /^([1-9][0-9]|150)$/,
      errorMessage: "El HP debe ser un número entre 1 y 150.",
    },
    attack: {
      pattern: /^([1-9][0-9]|200)$/,
      errorMessage: "El ataque debe ser un número entre 1 y 200.",
    },
    defense: {
      pattern: /^([1-9][0-9]|200)$/,
      errorMessage: "La defensa debe ser un número entre 1 y 200.",
    },
    speed: {
      pattern: /^([1-9][0-9]|100)$/,
      errorMessage: "La velocidad debe ser un número entre 1 y 100.",
    },
    height: {
      pattern: /^([1-9][0-9]{0,3}|80)$/,
      errorMessage: "La altura debe ser un número entre 1 y 80.",
    },
    weight: {
      pattern: /^([1-9][0-9]{0,3}|1500)$/,
      errorMessage: "El peso debe ser un número entre 1 y 1500.",
    },
    img: {
      pattern:
        /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?.*(png|jpg|jpeg|gif)$/,
      errorMessage:
        "Debes proporcionar una URL segura (https) y en formato jpg, jpeg, png o gif.",
    },
    type: {
      pattern: /^.+$/,
      errorMessage: "Debe seleccionar al menos un tipo de Pokemon.",
    },
  };

  let errorInput = {};

  for (const field in patterns) {
    if (!patterns[field].pattern.test(input[field])) {
      errorInput[field] = patterns[field].errorMessage;
    }
  }

  return errorInput;
};

export default validate;
