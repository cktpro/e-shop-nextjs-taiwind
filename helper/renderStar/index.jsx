import React from "react";

import GrayStar from "@/components/svg/grayStar";
import HalfStar from "@/components/svg/halfStar";
import Star from "@/components/svg/star";

const renderStars = (numOfStar) => {
  const MAX_STAR = 5;
  const stars = [];

  const renderStar = (imageName) => {
    switch (imageName) {
      case "orangeStar":
        return <Star key={stars.length} />;

      case "halfStar":
        return <HalfStar key={stars.length} />;

      case "grayStar":
        return <GrayStar key={stars.length} />;

      default:
        return null;
    }
  };

  if (numOfStar >= MAX_STAR) {
    for (let i = 1; i <= MAX_STAR; i += 1) {
      stars.push(renderStar("orangeStar"));
    }

    return stars;
  }

  for (let i = 1; i <= Math.floor(numOfStar); i += 1) {
    stars.push(renderStar("orangeStar"));
  }

  const remainingStars = MAX_STAR - numOfStar;

  if (remainingStars <= 0) {
    return stars;
  }

  if (remainingStars - Math.floor(remainingStars) === 0.5) {
    stars.push(renderStar("halfStar"));
  } else if (remainingStars - Math.floor(remainingStars) > 0.5) {
    stars.push(renderStar("grayStar"));
  } else if (remainingStars - Math.floor(remainingStars) < 0.5 && remainingStars - Math.floor(remainingStars) > 0) {
    stars.push(renderStar("orangeStar"));
  }

  if (remainingStars >= 1) {
    for (let i = 1; i <= Math.floor(remainingStars); i += 1) {
      stars.push(renderStar("grayStar"));
    }
  }

  return stars;
};

export { renderStars };
