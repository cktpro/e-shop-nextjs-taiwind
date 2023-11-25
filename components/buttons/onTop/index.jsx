import React, { useCallback } from "react";
import { ArrowUp } from "lucide-react";

function OnTop() {
  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    });
  }, []);

  return (
    <button
      title="go to top"
      onClick={handleClick}
      type="button"
      className="absolute flex items-center justify-center right-0 bottom-[80rem] sm:bottom-[52rem] md:bottom-[52rem] lg:bottom-[49rem] xl:bottom-[22rem] w-[2.875rem] h-[2.875rem] flex-shrink-0 rounded-full bg-secondary-1"
    >
      <ArrowUp />
    </button>
  );
}

export default OnTop;
