import React from "react";
import PropTypes from "prop-types";

function BtnOk(props) {
  const { handleClickOk } = props;

  return (
    <button
      onClick={() => handleClickOk()}
      type="button"
      className="flex px-[3rem] py-[1rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-secondary-2"
    >
      <span className="text-text-1 font-poppins text-[1rem] font-[500] leading-[1.5rem]">OK</span>
    </button>
  );
}

export default BtnOk;

BtnOk.propTypes = {
  handleClickOk: PropTypes.instanceOf(Function).isRequired,
};
