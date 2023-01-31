import React from "react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Document from "./Document";
import styles from "./styles/docsList.module.css";
import noContentStyles from "./styles/noContentMessage.module.css";
import btnStyles from "../add_button/buttons.module.css";
import DocSkeleton from "../skelotons/DocSkeleton";
import { FiPlusCircle } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { CircleSpinner } from "react-spinners-kit";
import AddBtn from "../buttons/AddBtn";
import DocForm from "./DocForm"
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

  useEffect(() => {
    if (clickedSearchItem) {
      const element = document.getElementById(clickedSearchItem._id);
      element?.scrollIntoView({ behavior: 'smooth' });
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

      <div className={styles.contentContainer} ref={node}>
        {
          docsArray.map((doc, index) => (
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
