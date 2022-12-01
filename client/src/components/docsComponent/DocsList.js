import React from "react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Document from "./Document";
// import DocForm from "./DocForm";

import styles from "./styles/docsList.module.css";
import noContentStyles from "./styles/noContentMessage.module.css";
import btnStyles from "../add_button/buttons.module.css";
import DocSkeleton from "../skelotons/DocSkeleton";
import { FiPlusCircle } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { CircleSpinner } from "react-spinners-kit";
const DocForm = lazy(() => import("./DocForm"));

const DocsList = ({
  docs,
  setHeading,
  imageData,
  setImageData,
  maximizeOrNot,
  setMaximizeOrNot,
  showHeaderFooter,
  setShowHeaderFooter,
  currDeletingDocId,
}) => {
  const [showEditButton, setEditButton] = useState(true);

  // const [btnExpandId, setBtnExpandId] = useState(null);
  // const [btnExpand, setBtnExpand] = useState(false);
  // const loadState = useSelector((state) => state.loading);


  // const [formMode, setFormMode] = useState(false);
  // const { place, isLoading, process, docsFetching } = loadState;
  // useEffect(() => {
  //   setHeading("Documents");
  // }, []);
  // const formToggle = () => {
  //   setFormMode(!formMode);
  // };
  // SCROLLING BUTTON HIDE__
  // const node = useRef();
  // var timeOut = null;
  // const [isScrolling, setIsScrolling] = useState(false);
  // useEffect(() => {
  //   if (node.current != null) {
  //     node.current.addEventListener("scroll", handleScroll);
  //   }
  //   return () => {
  //     if (node.current != null) {
  //       node.current.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);

  // const handleScroll = (e) => {
  //   setIsScrolling(true);
  //   clearTimeout(timeOut);
  //   timeOut = setTimeout(() => {
  //     setIsScrolling(false);
  //   }, 200);
  // };

  const docsData = [
    {
      title: "Aadhar card",
      imageUrl: "",
    },
    {
      title: "Pan card",
      imageUrl: "",
    }, {
      title: "XII marksheet",
      imageUrl: "",
    }, {
      title: "X marksheet",
      imageUrl: "",
    }, {
      title: "Domicle",
      imageUrl: "",
    }

  ]


  return (
    <div className={styles.docsList}>

      <div className={styles.contentContainer}>
        {
          docsData.map((doc, index) => (
            <Document doc={doc} key={index} />
          ))
        }
      </div>


    </div>
  );
};

export default DocsList;
