import React from "react";
import styles from "../styles/logosStyles.module.css";

const Zoom = () => {
  return (
    <svg
      // width="48" height="48"
      className={styles.svgStyles}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_21_272)">
        <path
          d="M2 16.6667C2 8.56649 8.56649 2 16.6667 2H31.3333C39.4336 2 46 8.56649 46 16.6667V31.3333C46 39.4336 39.4336 46 31.3333 46H16.6667C8.56649 46 2 39.4336 2 31.3333V16.6667Z"
          fill="#3984FD"
        />
        <path
          d="M11.1665 18.5001C11.1665 17.4876 11.9873 16.6667 12.9998 16.6667H23.9998C27.0375 16.6667 29.4998 19.1292 29.4998 22.1667V29.5001C29.4998 30.5126 28.6791 31.3334 27.6665 31.3334H16.6665C13.6289 31.3334 11.1665 28.8711 11.1665 25.8334V18.5001Z"
          fill="white"
        />
        <path
          d="M30.4165 23.5445C30.4165 22.6564 30.7388 21.7984 31.3236 21.13L34.4234 17.5876C35.2594 16.6321 36.8332 17.2234 36.8332 18.493V29.5074C36.8332 30.777 35.2594 31.3682 34.4234 30.4127L31.3236 26.8703C30.7388 26.2019 30.4165 25.3439 30.4165 24.4558V23.5445Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_21_272">
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

export default Zoom;
