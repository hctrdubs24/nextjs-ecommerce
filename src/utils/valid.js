const valid = (name, email, password, cf_password) => {
  if (!name || !email || !password) return "Por favor llene todos los campos.";

  if (!validateEmail(email)) return "Email invalido.";

  if (password.length < 6)
    return "La contraseña debe tener al menos 6 caracteres.";

  if (password !== cf_password) return "La contraseña no coincide.";
};

// recordar que lo cambie a una función flecha XD
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default valid;