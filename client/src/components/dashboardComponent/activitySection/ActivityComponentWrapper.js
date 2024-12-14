import React from "react";
import styles from "./styles/activityWrapper.module.css";
import EditFieldComponent from "./EditFieldComponent";
import NewAddedDeletedField from "./NewAddedDeletedField";
import ActivityTitleField from "./ActivityTitleField";

const ActivityComponentWrapper = ({ activity }) => {
  // console.log(activity);

  return (
    <div className={styles.activityComponentWrapper}>
      <div className={styles.dateTimeTaskTypeWrapper}>
        <div className={styles.dateWrapper}>
          <div className={styles.dateContainer}>
            <div className={styles.monthDiv}>
              <p>{activity.month}</p>
            </div>
            <div className={styles.dateDiv}>
              <p>{activity.date}</p>
            </div>
          </div>
        </div>

        <div className={styles.timeWrapper}>
          <div className={styles.timeContainer}>
            <p>{activity.time}</p>
          </div>
        </div>

        <div className={styles.typeWrapper}>
          <div className={styles.typeContainer}>
            <p>{activity.type}</p>
          </div>
        </div>

        <div className={styles.taskWrapper}>
          <div className={`${styles.taskContainer}`}>
            <p
              className={`${
                activity.task === "Deleted"
                  ? styles.taskContainerBorderDeleted
                  : activity.task === "Added"
                  ? styles.taskContainerBorderAdded
                  : styles.taskContainerBorderEdit
              }`}
            >
              {activity.task}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.fieldWrapper}>
        {activity.task === "Edit" && activity.type !== "Doc" && (
          <ActivityTitleField activity={activity} />
        )}

        {activity.subType === 3
          ? Object.entries(activity).map(([item, val]) => (
              <EditFieldComponent
                key={`${item}-${val}`}
                item={item}
                value={val}
              />
            ))
          : (activity.subType === 2 || activity.subType === 1) &&
            Object.entries(activity).map(([item, val]) => (
              <NewAddedDeletedField
                key={`${item}-${val}`}
                item={item}
                activity={activity}
              />
            ))}
      </div>
    </div>
  );
};

export default ActivityComponentWrapper;
