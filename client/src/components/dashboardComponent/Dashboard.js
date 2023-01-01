import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import styles from "./styles/dashboard.module.css";
import ActivityList from "./activitySection/ActivityList";
import ActivityComponentOuter from "./activitySection/ActivityComponentOuter";
const Dashboard = ({ setHeading }) => {


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
                <p>32</p>
              </div>
              <div className={styles.labelDiv}>
                <p>Logins</p>
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
                <p>18</p>
              </div>
              <div className={styles.labelDiv}>
                <p>Cards</p>
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
                <p>9</p>
              </div>
              <div className={styles.labelDiv}>
                <p>Docs</p>
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
        <div className={styles.recentlyAddedContentContainer}></div>
      </div>
    </div >
  );
};
export default Dashboard;
