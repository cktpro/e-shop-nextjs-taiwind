import { useEffect } from "react";
import NProgress from "nprogress"; // NProgress package
import PropTypes from "prop-types";

import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });
// Hiển thị tiến trình khi state thay đổi

function ProcessLoader(props) {
  const { isLoading } = props;
  useEffect(() => {
    if (isLoading === true) NProgress.start();
    else NProgress.done();
  }, [isLoading]);
  return null;
}

export default ProcessLoader;

ProcessLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
