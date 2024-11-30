import React from "react";
import styles from "../styles/logosStyles.module.css";

const Microsoft = () => {
  return (
    <svg
      // width="48" height="48"
      className={styles.svgStyles}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_21_264)">
        <path d="M22.8135 22.8135H2V2H22.8135V22.8135Z" fill="#F1511B" />
        <path
          d="M45.7962 22.8135H24.981V2H45.7945V22.8135H45.7962Z"
          fill="#80CC28"
        />
        <path d="M22.8135 45.803H2V24.9895H22.8135V45.803Z" fill="#00ADEF" />
        <path
          d="M45.7962 45.803H24.981V24.9895H45.7945V45.803H45.7962Z"
          fill="#FBBC09"
        />
      </g>
      <defs>
        <clipPath id="clip0_21_264">
          <rect
            width="43.7962"
            height="43.8032"
            fill="white"
            transform="translate(2 2)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Microsoft;
