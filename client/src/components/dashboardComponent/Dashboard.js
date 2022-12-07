import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/dashboard.module.css";
import ActivityList from "./activitySection/ActivityList";
const Dashboard = ({ setHeading }) => {
  const loginIdsArray = useSelector((state) => state.logins.loginIds);
  const cardsArray = useSelector((state) => state.cards.cards);
  const docsArray = useSelector((state) => state.docs.docs);
  const activitiesArray = useSelector((state) => state.activities);

  // useEffect(() => {
  //   setHeading("Dashboard");
  // }, []);

  return (
    <div className={styles.dashboardComponent}>
      <div className={styles.overviewWrapper}>
        <div className={styles.overviewHeadingContainer}>
          <div className={styles.wrapperHeadingDiv}>
            <p>Overview</p>
          </div>
        </div>
        <div className={styles.overviewContentContainer}>
        </div>
      </div>
      <div className={styles.recentActivitesWrapper}>
        <div className={styles.recentActivitesHeadingContianer}>
          <div className={styles.wrapperHeadingDiv}>
            <p>Recent Activities</p>
          </div>
        </div>
        <div className={styles.recentActivitesContentContianer}></div>
      </div>
      <div className={styles.recentlyAddedWrapper}>
        <div className={styles.recentlyAddedHeadingContainer}>
          <div className={styles.wrapperHeadingDiv}>
            <p>Recently Added</p>
          </div>
        </div>
        <div className={styles.recentlyAddedContentContainer}></div>
      </div>
    </div>
  );
};
export default Dashboard;
