import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editLoginId, loginIdFavToggle, deleteLoginId } from "../../redux/actions/loginInIdsAction";
import LoginIdLogo from "./LoginIdLogo";
import styles from "./styles/loginIdComponent.module.css";
import modalStyles from "../modal/modal.module.css";
import { CircleSpinner } from "react-spinners-kit";
import { motion } from "framer-motion";

import TrashIcon from "../icons/TrashIcon";
import BookmarkPlus from "../icons/BookmarkPlus";
import BookmarkFill from "../icons/BookmarkFill";
import PencilIcon from "../icons/PencilIcon";
import CancelIcon from "../icons/CancelIcon";
import CheckIcon from "../icons/CheckIcon";


// icons set
import { Icon, InlineIcon } from "@iconify/react";

const LoginId = ({
  loginId,
  formMode,
  setFormMode,
  setEditButton,
  showEditButton,
  setCurrEditId,
  currEditId,
  index,
  displayFullContent,
  handleLoginIdClicked,

}) => {
  const [modalShow, setModalShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [oldData, setOldData] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [oldLoginIdData, setOldLoginIdData] = useState();
  const [loginData, setLoginData] = useState({
    website: "",
    username: "",
    password: "",
  });
  const loginIdDataToEdit = useSelector((state) =>
    editId ? state.logins.loginIds.find((l) => l._id === editId) : null
  );

  const [currLoginIdData, setCurrLoginIdData] = useState();
  const loadState = useSelector((state) => state.loading);
  const { itemId, place, isLoading, process } = loadState;
  const searchResultArray = useSelector(
    (state) => state.searchResults.searchResults
  );

  useEffect(() => {
    if (loginIdDataToEdit) {
      setLoginData(loginIdDataToEdit);
    }
  }, [loginIdDataToEdit]);

  useEffect(() => {
    setCurrLoginIdData(loginId);
    setOldData(loginId);
    setOldLoginIdData(loginId);
  }, [loginId]);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);

  const handleFavToggle = (loginCardId) => {
    var favValue = currLoginIdData.isFavourite;
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }
    setCurrLoginIdData({ ...currLoginIdData, isFavourite: isFav });
    dispatch(loginIdFavToggle(loginCardId, isFav));
  };
  const save = (id) => {
    dispatch(
      editLoginId(
        id,
        oldLoginIdData,
        loginData,
        userId,
        searchResultArray.length
      )
    );
  };

  const confirmDelete = (loginCardId) => {
    //NOTE : We are also sending deleteCard data as an argument to add to activityAction
    dispatch(deleteLoginId(loginId, loginCardId, userId));
    setModalShow(!modalShow);
    setEditId(null);
  };
  const handleDeleteClick = () => {
    setModalShow(!modalShow);
  };



  return (
    <>
      <div className={styles.loginInWrapper}
        onClick={() => {
          handleLoginIdClicked(loginId);
        }}>
        <div className={styles.logoWrapper} >
          <div className={styles.logoDiv}>

          </div>
        </div>
        <div className={styles.titleWrapper} >
          <p className={styles.titleText}>
            {loginId.title}
          </p>
        </div>
        <div className={styles.usernameWrapper} >
          <p className={styles.userNameText}>
            {loginId.username}
          </p>
        </div>
        <div className={styles.favBtnWrapper} ></div>
      </div>
    </>
  );
};
export default LoginId;

