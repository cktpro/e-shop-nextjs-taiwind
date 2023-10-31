import { useRouter } from "next/router";

import en from "@/public/lang/en";
import vi from "@/public/lang/vi";

export const useTrans = (key) => {
  const { locale } = useRouter();

  const trans = locale === "vi" ? vi : en;

  if (key.includes(".") && key.split(".").length - 1 === 1) {
    const convertKey = key.split(".");

    const objectName = convertKey[0];
    const objectField = convertKey[1];

    return trans[objectName][objectField] || key;
  }

  if (key.includes(".") && key.split(".").length - 1 === 2) {
    const convertKey = key.split(".");

    const objectName = convertKey[0];
    const objectField = convertKey[1];
    const childOfField = convertKey[2];

    return trans[objectName][objectField][childOfField] || key;
  }

  return trans[key] || key;
};
