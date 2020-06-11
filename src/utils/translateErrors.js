const translateErrors = errors => {
  const translatedErrors = [];
  errors.forEach(error => {
    switch (error.message) {
      case "username must be unique":
        translatedErrors.push({ message: "Nombre de usuario existente" });
        break;
      case "email must be unique":
        translatedErrors.push({ message: "Correo ya registrado" });
        break;
      default:
        translatedErrors.push({ message: error.message });
        break;
    }
  });
  return translatedErrors;
};

export default translateErrors;
