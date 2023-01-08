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
  docs,
  setHeading,
  imageData,
  setImageData,
  maximizeOrNot,
  setMaximizeOrNot,
  showHeaderFooter,
  setShowHeaderFooter,
  currDeletingDocId,
  setDocFullScreen,
  setFullScreenDocData
}) => {
  const [showEditButton, setEditButton] = useState(true);

  const [showDocInputForm, setShowDocInputForm] = useState(false);
  const docsArray = useSelector((state) => state.docs.docsData);

  useEffect(() => {
    console.log(docsArray);
  }, [docsArray])

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
        <AddBtn formToggle={formToggle} />
      }

      <div className={styles.contentContainer}>
        {
          docsArray.map((doc, index) => (
            <Document
              doc={doc}
              key={index}
              setDocFullScreen={setDocFullScreen}
              setFullScreenDocData={setFullScreenDocData}

            />
          ))
        }
      </div>


    </div>
  );
};

export default DocsList;
