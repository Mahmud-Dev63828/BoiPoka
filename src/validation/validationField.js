// validate form input
export const validationField = (info, setError) => {
  let error = {};
  for (let field in info) {
    if (info[field] === "") {
      error[`${field}Error`] = `${field} is required or missing`;
    }
  }
  setError(error);

  return Object.keys(error).length === 0;
};
