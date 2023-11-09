const fuzzySearch = (text) => {
  const regex = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

  return new RegExp(regex, "gi");
};

export { fuzzySearch };
