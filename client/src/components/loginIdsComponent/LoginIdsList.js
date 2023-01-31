import React from "react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import LoginId from "./LoginId";
import styles from "./styles/loginList.module.css";
import FullContentCard from "./FullContentCard";
import AddBtn from "../buttons/AddBtn";
import LoginIdInputForm from "./LoginIdInputForm";
import DeleteModal from "../modal/DeleteModal"
import { diff, generateActivityData } from "../utils/ActivityDataChangeFuction"
import { editLoginIdData, deleteLoginData, toggleIsFav } from "../../redux/features/loginsId/loginsIdSlice"

const LoginIdsList = ({ setLogoComponentShow,
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

  useEffect(() => {
    if (clickedSearchItem) {
      const element = document.getElementById(clickedSearchItem._id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [clickedSearchItem])

  const dispatch = useDispatch();

  const loginIdsArray = useSelector((state => state.loginIds.loginsIdData));
  const userId = useSelector((state) => state.user._id);


  const [formMode, setFormMode] = useState(false);
  const [showEditButton, setEditButton] = useState(true);
  const [currEditId, setCurrEditId] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [showInputForm, setShowInputForm] = useState(false);

  const [showContentCard, setShowContentCard] = useState(false);

  const [fullContentCardData, setFullContentCardData] = useState(undefined)

  const [deleteMode, setDeleteMode] = useState(false);


  const formToggle = () => {
    setShowInputForm(!showInputForm);
  };


  const handleFullContentBackBtnClicked = () => {
    setShowContentCard(false);
    setEditMode(false);
  }

  const currCardDataInStore = useSelector((state) =>
    fullContentCardData !== undefined ? state.loginIds.loginsIdData.find((l) => l._id === fullContentCardData._id) : null
  );
  //> Delete Btn clicked________
  const confirmDeleteBtnClicked = () => {
    console.log('confirm delete')
    const activity_data = generateActivityData(2, 'Login', fullContentCardData, '');
    dispatch(deleteLoginData({
      login_id: fullContentCardData._id,
      user_id: userId,
      activityData: activity_data,
    }))

    setDeleteMode(false);
    setShowContentCard(false);
  }

  const handleLoginIdClicked = (loginIData) => {
    if (loginIData != undefined) {
      setFullContentCardData({
        _id: loginIData._id,
        app: loginIData.app,
        category: loginIData.category,
        title: loginIData.title,
        username: loginIData.username,
        password: loginIData.password,
        logoIndex: loginIData.logoIndex,
        isFavourite: loginIData.isFavourite,
      })
    }
    setDeleteMode(false);
    setShowContentCard(true);
  }


  return (
    <div className={styles.loginsList}>
      <DeleteModal
        setDeleteMode={setDeleteMode}
        deleteMode={deleteMode}
        confirmDeleteBtnClicked={confirmDeleteBtnClicked}
      />

      {
        ((!showInputForm && !showContentCard)) &&
        < AddBtn formToggle={formToggle} isScrolling={isScrolling} />
      }

      <div className={(showContentCard || showInputForm) ? styles.contentContainerClose : styles.contentContainer} ref={node}>
        {loginIdsArray.map((loginId, index) => (
          <LoginId
            key={loginId._id}
            loginId={loginId}
            setFullContentCardData={setFullContentCardData}
            handleLoginIdClicked={handleLoginIdClicked}
            fullContentCardData={fullContentCardData}
            clickedSearchItem={clickedSearchItem}
          />
        ))}
      </div>

      {
        fullContentCardData &&
        <FullContentCard
          setLogoComponentShow={setLogoComponentShow}
          fullContentCardData={fullContentCardData}
          setFullContentCardData={setFullContentCardData}
          showContentCard={showContentCard}
          setShowContentCard={setShowContentCard}
          handleFullContentBackBtnClicked={handleFullContentBackBtnClicked}
          setEditMode={setEditMode}
          editMode={editMode}
          handleLoginIdClicked={handleLoginIdClicked}
          setDeleteMode={setDeleteMode}
          deleteMode={deleteMode}
        />
      }
      <LoginIdInputForm
        showInputForm={showInputForm}
        setShowInputForm={setShowInputForm}
        formToggle={formToggle}

      />
      {/* {showInputForm &&
      } */}
    </div >
  );
};

export default LoginIdsList;
{/* <div className={styles.contentContainer} ref={node}>

        {loginsFetching === true && loginIds.length < 1 ? (
          <>
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
          </>
        ) : loginsFetching === false && loginIds.length < 1 ? (
          <div className={noContentStyles.messageContainer}>
            <p>No Logins Added</p>

            <div className={noContentStyles.footerDIv}>
              Click
              <FiPlusCircle className={noContentStyles.icon} fontSize="19px" />
              to add
            </div>
          </div>
        ) : (
          loginsFetching === false &&
          loginIds.length > 1 &&
          (
            <>
              {loginIds.map((loginId, index) => (
                <React.Fragment key={loginId._id}>
                  <LoginId
                    index={index}
                    loginId={loginId}
                    setCurrentId={setCurrentId}
                    formMode={formMode}
                    setFormMode={setFormMode}
                    setEditButton={setEditButton}
                    showEditButton={showEditButton}
                    setCurrEditId={setCurrEditId}
                    currEditId={currEditId}
                  />
                </React.Fragment>
              ))}
            </>
          )
        )}
        <Suspense
          fallback={
            <div>
              <CircleSpinner size={12} color="gray" loading={true} />
            </div>
          }
        >
          <LoginIdForm
            currentId={currentId}
            setCurrentId={setCurrentId}
            formMode={formMode}
            setFormMode={setFormMode}
          />
        </Suspense>

        {formMode === false ? (
          <div
            className={
              isScrolling === false
                ? btnStyles.addBtnWrapper
                : btnStyles.addBtnWrapperHidden
            }
            onClick={formToggle}
          >
            <div className={btnStyles.addBtnIconDIv}>
              <HiPlus />
            </div>
            <div className={btnStyles.addBtnTextDiv}>
              <p>Add</p>
            </div>
          </div>
        ) : null}
      </div> */}


/*

const loginIds = [

{
app: "Gpay",
category: "Finance",
title: "Google pay",
username: "andrew.GarF@gmial.com",
password: "andrew@122",
logoIndex: 39,
},
{
app: "Amazon",
category: "Shopping",
title: "Amazon shopping app",
username: "andrew@amz.com",
password: "andrew@1dsds",
logoIndex: 5,

}
, {
app: "Instagram",
category: "Social",
title: "Instagram app",
username: "andrew@facebook.com",
password: "andrew@1d32",
logoIndex: 50,

}, {
app: "facebbok",
category: "Social",
title: "Facebook.com",
username: "andrew@facebook.com",
password: "andrew@1d32",
logoIndex: 28,

}, {
app: "Gmail",
category: "Social",
title: "Gmail primary",
username: "andrew@facebook.com",
password: "andrew@1d32",
logoIndex: 35,

}, {
app: "Github",
category: "Social",
title: "Github.com",
username: "andrew@facebook.com",
password: "andrew@1d32",
logoIndex: 34,

}, {
app: "Spotify",
category: "Social",
title: "Spotify music app",
username: "andrew@facebook.com",
password: "andrew@1d32",
logoIndex: 79,
}

]
*/

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