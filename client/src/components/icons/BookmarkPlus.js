import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BookmarkPlus = ({ className, primaryColor, secondaryColor }) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6182 3H6.5C6.22386 3 6 3.22386 6 3.5V21.1176C6 21.5061 6.4237 21.7462 6.75696 21.5465L11.743 18.5594C11.9012 18.4646 12.0988 18.4646 12.257 18.5594L17.243 21.5465C17.5763 21.7462 18 21.5061 18 21.1176V12.2432"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 2V8M16 5H22"
        stroke={secondaryColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BookmarkPlus;
