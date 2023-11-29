import React from "react";
import PropTypes from "prop-types";

function UpdateCart(props) {
  const { text, onClick, type, disabled } = props;

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick && ((e) => onClick(e))}
      className="disabled:opacity-50 inline-flex px-[3rem] py-[1rem] min-h-[3.5rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-button-2"
      disabled={disabled || false}
    >
      <span className="min-h-[1.5rem] text-text-1 font-poppins text-[1rem] font[500] leading-[1.5rem] whitespace-nowrap">
        {text}
      </span>
    </button>
  );
}

export default UpdateCart;

UpdateCart.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.instanceOf(Function).isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
