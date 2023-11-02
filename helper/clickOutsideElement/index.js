const { useRef, useEffect } = require("react");

const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback, ref]);

  return ref;
};

const useOutsideDrawderClick = (open, close, isActive) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && ref.current.contains(event.target) && !isActive) {
        open();
      } else if (ref.current && !ref.current.contains(event.target) && isActive) {
        close();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [close, isActive, open, ref]);

  return ref;
};

export { useOutsideClick, useOutsideDrawderClick };
