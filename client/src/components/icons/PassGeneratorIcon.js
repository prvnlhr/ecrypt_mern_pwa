import React from "react";
import { useSelector } from "react-redux";
const PassGeneratorIcon = ({ styles }) => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  return (
    <>
      {isDarkMode === true ? (
        <svg
          className={styles.passGeneratorIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
            stroke="#5294E2"
            strokeWidth="1.5"
          />
          <circle cx="7.25" cy="16.75" r="1.75" fill="#4D6090" />
          <circle cx="7.25" cy="7.25" r="1.75" fill="#4D6090" />
          <circle cx="16.75" cy="16.75" r="1.75" fill="#4D6090" />
          <circle cx="12" cy="12" r="1.75" fill="#4D6090" />
          <circle cx="16.75" cy="7.25" r="1.75" fill="#4D6090" />
        </svg>
      ) : (
        <svg
          className={styles.passGeneratorIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
            stroke="#2B3F6C"
            strokeWidth="1.5"
          />
          <circle opacity="0.3" cx="7.25" cy="16.75" r="1.75" fill="#2B3F6C" />
          <circle opacity="0.3" cx="7.25" cy="7.25" r="1.75" fill="#2B3F6C" />
          <circle opacity="0.3" cx="16.75" cy="16.75" r="1.75" fill="#2B3F6C" />
          <circle opacity="0.3" cx="12" cy="12" r="1.75" fill="#2B3F6C" />
          <circle opacity="0.3" cx="16.75" cy="7.25" r="1.75" fill="#2B3F6C" />
        </svg>
      )}
    </>
  );
};

export default PassGeneratorIcon;

/*
<svg 
                    className={styles.passGeneratorIcon}

viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2" y="2" width="20" height="20" rx="5" stroke="#2B3F6C" strokeWidth="1.5"/>
<circle opacity="0.3" cx="7.25" cy="16.75" r="1.75" fill="#2B3F6C"/>
<circle opacity="0.3" cx="7.25" cy="7.25" r="1.75" fill="#2B3F6C"/>
<circle opacity="0.3" cx="16.75" cy="16.75" r="1.75" fill="#2B3F6C"/>
<circle opacity="0.3" cx="12" cy="12" r="1.75" fill="#2B3F6C"/>
<circle opacity="0.3" cx="16.75" cy="7.25" r="1.75" fill="#2B3F6C"/>
</svg>

*/
