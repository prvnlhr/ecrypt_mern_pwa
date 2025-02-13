import React from "react";
import { useSelector } from "react-redux";
const EyeIconOpen = ({ styles, togglePassVisibility }) => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  return (
    <>
      {isDarkMode === true ? (
        <svg
          className={styles.passVisibilityIcon}
          onClick={togglePassVisibility}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4644 4.46436L4.46436 19.4644"
            stroke="#4D6090"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.9642 16.9036C5.60982 16.6638 5.27058 16.4034 4.94816 16.1243C3.97944 15.2857 3.16202 14.2769 2.54254 13.1442C2.15248 12.4309 2.15249 11.5687 2.54256 10.8555C4.36847 7.51674 7.91882 5.24988 12 5.24988C12.9668 5.24988 13.905 5.37727 14.7981 5.61657C15.4207 5.78339 16.0209 6.00447 16.5934 6.27439L15.4543 7.41348C15.1156 7.27761 14.767 7.16115 14.4099 7.06546C13.6423 6.85978 12.8346 6.74988 12 6.74988C8.4879 6.74988 5.43153 8.69907 3.8586 11.5752C3.7138 11.84 3.7138 12.1597 3.8586 12.4244C4.38561 13.3881 5.07974 14.2484 5.9023 14.9662L7.07499 15.7928L5.9642 16.9036ZM19.5236 8.30894C19.227 8.01977 18.7522 8.02577 18.463 8.32234C18.1738 8.61891 18.1798 9.09375 18.4764 9.38292C19.1347 10.0248 19.6974 10.7633 20.1414 11.5753C20.2862 11.8401 20.2862 12.1598 20.1414 12.4246C18.5685 15.3007 15.5121 17.2499 12 17.2499C11.2002 17.2499 10.4251 17.1489 9.68628 16.9595C9.28505 16.8566 8.87638 17.0985 8.7735 17.4997C8.67062 17.901 8.91249 18.3096 9.31372 18.4125C10.1732 18.6329 11.0735 18.7499 12 18.7499C16.0812 18.7499 19.6315 16.483 21.4574 13.1443C21.8475 12.4311 21.8475 11.5689 21.4575 10.8556C20.9413 9.91167 20.2876 9.05391 19.5236 8.30894Z"
            fill="#5294E2"
          />
          <path
            d="M9 12C9 10.3431 10.3431 9 12 9"
            stroke="#4D6090"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          className={styles.passVisibilityIcon}
          onClick={togglePassVisibility}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.3"
            d="M19.4644 4.46436L4.46436 19.4644"
            stroke="#2B3F6C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.9642 16.9037C5.60982 16.6639 5.27058 16.4036 4.94816 16.1244C3.97944 15.2858 3.16202 14.2771 2.54254 13.1443C2.15248 12.431 2.15249 11.5688 2.54256 10.8556C4.36847 7.51686 7.91882 5.25 12 5.25C12.9668 5.25 13.905 5.37739 14.7981 5.6167C15.4207 5.78351 16.0209 6.0046 16.5934 6.27451L15.4543 7.4136C15.1156 7.27773 14.767 7.16127 14.4099 7.06559C13.6423 6.85991 12.8346 6.75 12 6.75C8.4879 6.75 5.43153 8.69919 3.8586 11.5753C3.7138 11.8401 3.7138 12.1598 3.8586 12.4246C4.38561 13.3883 5.07974 14.2485 5.9023 14.9663L7.07499 15.7929L5.9642 16.9037ZM19.5236 8.30907C19.227 8.0199 18.7522 8.0259 18.463 8.32247C18.1738 8.61904 18.1798 9.09387 18.4764 9.38304C19.1347 10.0249 19.6974 10.7635 20.1414 11.5754C20.2862 11.8402 20.2862 12.1599 20.1414 12.4247C18.5685 15.3008 15.5121 17.25 12 17.25C11.2002 17.25 10.4251 17.1491 9.68628 16.9596C9.28505 16.8567 8.87638 17.0986 8.7735 17.4998C8.67062 17.9011 8.91249 18.3097 9.31372 18.4126C10.1732 18.633 11.0735 18.75 12 18.75C16.0812 18.75 19.6315 16.4831 21.4574 13.1444C21.8475 12.4312 21.8475 11.569 21.4575 10.8557C20.9413 9.91179 20.2876 9.05403 19.5236 8.30907Z"
            fill="#2B3F6C"
          />
          <path
            opacity="0.3"
            d="M9 12C9 10.3431 10.3431 9 12 9"
            stroke="#2B3F6C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </>
  );
};

export default EyeIconOpen;
