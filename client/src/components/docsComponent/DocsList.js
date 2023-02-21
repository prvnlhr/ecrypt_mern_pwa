import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Document from "./Document";
import styles from "./styles/docsList.module.css";
import DocsSkeleton from "../skelotons/DocsSkeleton"

import AddBtn from "../buttons/AddBtn";
import DocInputForm from "./DocInputForm";

const DocsList = ({
  setDocFullScreen,
  setFullScreenDocData,
  setClickedSearchItem,
  clickedSearchItem,

}) => {

  // ____________________________________________
  // SCROLLING BUTTON HIDE__
  const node = useRef();
  var timeOut = null;
  const [isScrolling, setIsScrolling] = useState(false);


  useEffect(() => {
    if (node.current != null) {
      node.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (node.current != null) {
        node.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = (e) => {
    setIsScrolling(true);
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
  };
  //________________________________________________



  const [showEditButton, setEditButton] = useState(true);

  const [showDocInputForm, setShowDocInputForm] = useState(false);
  const docsArray = useSelector((state) => state.docs.docsData);
  const docsState = useSelector((state) => state.docs);
  const { isLoading, action } = docsState;

  useEffect(() => {
    if (clickedSearchItem) {
      const element = document.getElementById(clickedSearchItem._id);

      //> block : Defines vertical alignment
      //> inline: Defines horizontal alignment
      element?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [clickedSearchItem])


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

  const formToggle = () => {
    setShowDocInputForm(!showDocInputForm);
  }


  return (
    <div className={styles.docsList}>

      {showDocInputForm ?
        <DocInputForm
          formToggle={formToggle}
          setShowDocInputForm={setShowDocInputForm}
          showDocInputForm={showDocInputForm}
        /> :
        <AddBtn formToggle={formToggle} isScrolling={isScrolling} />
      }

      <div className={`${styles.contentContainer} ${showDocInputForm && styles.blurContainer} `} ref={node}>

        {isLoading === true && action === 'fetch' ?
          <>
            <DocsSkeleton />
            <DocsSkeleton />
            <DocsSkeleton />
          </> :
          docsArray?.map((doc, index) => (
            <Document
              doc={doc}
              key={index}
              setDocFullScreen={setDocFullScreen}
              setFullScreenDocData={setFullScreenDocData}
              clickedSearchItem={clickedSearchItem}
            />
          ))
        }

      </div>


    </div>
  );
};

export default DocsList;
