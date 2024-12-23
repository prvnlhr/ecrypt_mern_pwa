import React, { useState } from "react";
import styles from "./styles/rectDoc.module.css";
import { logosArray } from "../../logoComponents/logosData";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const Doc = ({ item, handleItemClicked }) => {
  return (
    <div
      className={styles.cardWrapper}
      onClick={() => handleItemClicked(item)}
    >
      <div className={styles.cardContainer}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoDiv}>
            <svg
              className={styles.docIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.3">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.25 1.25634C14.1881 1.25213 14.1258 1.25 14.0633 1.25H8C5.37665 1.25 3.25 3.37665 3.25 6V18C3.25 20.6234 5.37665 22.75 8 22.75H16C18.6234 22.75 20.75 20.6234 20.75 18V8.75H17C15.4812 8.75 14.25 7.51878 14.25 6V1.25634ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12ZM8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H12C12.4142 17.75 12.75 17.4142 12.75 17C12.75 16.5858 12.4142 16.25 12 16.25H8Z"
                  fill="#2B3F6C"
                />
                <path
                  d="M20.3215 7.25C20.2584 7.15059 20.1887 7.0549 20.1126 6.96359L16.1759 2.23949C16.048 2.08601 15.905 1.94837 15.75 1.82802V6C15.75 6.69036 16.3096 7.25 17 7.25H20.3215Z"
                  fill="#2B3F6C"
                />
              </g>
              <path
                d="M8 12H16"
                stroke="#2B3F6C"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M8 17H12"
                stroke="#2B3F6C"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className={styles.dateWrapper}>
          <div className={styles.dateDiv}>
            <p>{item.createdAt}</p>
          </div>
        </div>
        <div className={styles.titleWrapper}>
          <p>{item.imageName}</p>
        </div>
      </div>
    </div>
  );
};

export default Doc;
