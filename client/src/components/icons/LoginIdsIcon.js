import React from "react";
import styles from "./styles/iconStyles.module.css";
import { useSelector, useDispatch } from "react-redux";

const theme = "dark";

const LoginIdsIcon = () => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);

  return (
    <>
      {isDarkMode === true ? (
        <svg
          className={styles.iconsStyles}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 1.25C3.82436 1.25 1.25 3.82436 1.25 7V17C1.25 20.1756 3.82436 22.75 7 22.75H17C20.1756 22.75 22.75 20.1756 22.75 17V7C22.75 3.82436 20.1756 1.25 17 1.25H7ZM11.1465 11.75C10.82 10.5957 9.75878 9.75 8.5 9.75C6.98122 9.75 5.75 10.9812 5.75 12.5C5.75 14.0188 6.98122 15.25 8.5 15.25C9.75878 15.25 10.82 14.4043 11.1465 13.25L14.999 13.25L15 13.25L15.001 13.25H17.4988H17.5C17.8883 13.25 18.2077 12.9549 18.2461 12.5767C18.2487 12.5515 18.25 12.5259 18.25 12.5V10.5C18.25 10.0858 17.9142 9.75 17.5 9.75C17.0858 9.75 16.75 10.0858 16.75 10.5V11.75H15.75V10.5C15.75 10.0858 15.4142 9.75 15 9.75C14.5858 9.75 14.25 10.0858 14.25 10.5V11.75L11.1465 11.75ZM9.75 12.5C9.75 11.8096 9.19036 11.25 8.5 11.25C7.80964 11.25 7.25 11.8096 7.25 12.5C7.25 13.1904 7.80964 13.75 8.5 13.75C9.19036 13.75 9.75 13.1904 9.75 12.5Z"
            fill="white"
          />
          <path
            d="M17.5 12.5L10.5 12.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 10.5L17.5 12.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 10.5L15 12.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="2"
            cy="2"
            r="2"
            transform="matrix(-1 0 0 1 10.5 10.5)"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        <svg
          // width="24" height="24"
          className={styles.iconsStyles}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 1.25C3.82436 1.25 1.25 3.82436 1.25 7V17C1.25 20.1756 3.82436 22.75 7 22.75H17C20.1756 22.75 22.75 20.1756 22.75 17V7C22.75 3.82436 20.1756 1.25 17 1.25H7ZM11.1465 11.75C10.82 10.5957 9.75878 9.75 8.5 9.75C6.98122 9.75 5.75 10.9812 5.75 12.5C5.75 14.0188 6.98122 15.25 8.5 15.25C9.75878 15.25 10.82 14.4043 11.1465 13.25L14.999 13.25L15 13.25L15.001 13.25H17.4988H17.5C17.8883 13.25 18.2077 12.9549 18.2461 12.5767C18.2487 12.5515 18.25 12.5259 18.25 12.5V10.5C18.25 10.0858 17.9142 9.75 17.5 9.75C17.0858 9.75 16.75 10.0858 16.75 10.5V11.75H15.75V10.5C15.75 10.0858 15.4142 9.75 15 9.75C14.5858 9.75 14.25 10.0858 14.25 10.5V11.75L11.1465 11.75ZM9.75 12.5C9.75 11.8096 9.19036 11.25 8.5 11.25C7.80964 11.25 7.25 11.8096 7.25 12.5C7.25 13.1904 7.80964 13.75 8.5 13.75C9.19036 13.75 9.75 13.1904 9.75 12.5Z"
            fill="#2B3F6C"
          />
          <path
            d="M17.5 12.5L10.5 12.5"
            stroke="#2B3F6C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 10.5L17.5 12.5"
            stroke="#2B3F6C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 10.5L15 12.5"
            stroke="#2B3F6C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="2"
            cy="2"
            r="2"
            transform="matrix(-1 0 0 1 10.5 10.5)"
            stroke="#2B3F6C"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </>
  );
};

export default LoginIdsIcon;
