import React from "react";
import styles from "../styles/logosStyles.module.css";

const Unsplash = () => {
  return (
    <svg
      //  width="48" height="48"
      className={styles.svgStyles}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_237_344)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.75 2H32.25V14.375H15.75V2ZM2 21.25H15.7899V33.735H32.3261V21.25H46V46H2V21.25Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_237_344">
          <rect
            width="44"
            height="44"
            fill="white"
            transform="translate(2 2)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Unsplash;
