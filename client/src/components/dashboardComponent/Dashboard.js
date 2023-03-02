import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import styles from "./styles/dashboard.module.css";
import ActivityList from "./activitySection/ActivityList";
// import ActivityComponentWrapper from "./activitySection/ActivityComponentWrapper";
import RecentlyAddedList from "./recentlyAddedSection/RecentlyAddedList"
const Dashboard = ({ setHeading,
  recAddDocFullScreen,
  setRecAddDocFullScreen,
  recAddDocFullScreenData,
  setRecAddDocFullScreenData,
  clickedSearchItem,
  setClickedSearchItem
}) => {

  const loginIdsArray = useSelector((state => state.loginIds.loginsIdData));
  const cardsArray = useSelector((state => state.cards.cardsData));
  const docsArray = useSelector((state) => state.docs.docsData);
  const [dataCount, setDataCount] = useState({
    loginsCount: 0,
    cardsCount: 0,
    docsCount: 0,
  });

  useEffect(() => {
    setDataCount({
      ...dataCount,
      loginsCount: loginIdsArray?.length,
      cardsCount: cardsArray?.length,
      docsCount: docsArray?.length
    })

  }, [loginIdsArray, cardsArray, docsArray])



  return (
    <div className={styles.dashboardComponent}>
      <div className={styles.overviewWrapper}>
        <div className={styles.overviewHeadingContainer}>
          <div className={styles.wrapperHeadingDiv}>
            <p>Overview</p>
          </div>
        </div>
        <div className={styles.overviewContentContainer}>

          <div className={styles.boxContainer} >
            <div className={styles.iconContainer}>
              <div className={styles.iconDiv1}>
                <Icon className={styles.countIcon} icon="ant-design:key-outlined" />
              </div>
            </div>
            <div className={styles.count_and_Label_Container}>
              <div className={styles.countDiv}>
                <p className={styles.listCountText}>{dataCount.loginsCount}</p>
              </div>
              <div className={styles.labelDiv}>
                <p className={styles.countLabelText} >Logins</p>
              </div>
            </div>
          </div>

          <div className={styles.boxContainer} >
            <div className={styles.iconContainer}>
              <div className={styles.iconDiv2}>
                <Icon className={styles.countIcon} icon="bi:credit-card-2-back" />
              </div>
            </div>
            <div className={styles.count_and_Label_Container}>
              <div className={styles.countDiv}>
                <p className={styles.listCountText} >{dataCount.cardsCount}</p>
              </div>
              <div className={styles.labelDiv}>
                <p className={styles.countLabelText}>Cards</p>
              </div>
            </div>
          </div>


          <div className={styles.boxContainer} >
            <div className={styles.iconContainer}>
              <div className={styles.iconDiv3}>
                <Icon className={styles.countIcon} icon="tabler:notes" />
              </div>
            </div>
            <div className={styles.count_and_Label_Container}>
              <div className={styles.countDiv}>
                <p className={styles.listCountText} >{dataCount.docsCount}</p>
              </div>
              <div className={styles.labelDiv}>
                <p className={styles.countLabelText}>Docs</p>
              </div>
            </div>
          </div>



        </div>
      </div>
      <div className={styles.recentActivitesWrapper}>
        <div className={styles.recentActivitesHeadingContianer}>
          <div className={styles.wrapperHeadingDiv}>
            <p>Recent Activities</p>
          </div>
        </div>

        <div className={styles.recentActivitesContentContianer}>
          <ActivityList />
        </div>

      </div>
      <div className={styles.recentlyAddedWrapper}>
        <div className={styles.recentlyAddedHeadingContainer}>
          <div className={styles.wrapperHeadingDiv}>
            <p>Recently Added</p>
          </div>
        </div>
        <div className={styles.recentlyAddedContentContainer}>
          <RecentlyAddedList
            recAddDocFullScreen={recAddDocFullScreen}
            setRecAddDocFullScreen={setRecAddDocFullScreen}
            recAddDocFullScreenData={recAddDocFullScreenData}
            setRecAddDocFullScreenData={setRecAddDocFullScreenData}
            clickedSearchItem={clickedSearchItem}
            setClickedSearchItem={setClickedSearchItem}
          />
        </div>
      </div>
    </div >
  );
};
export default Dashboard;
