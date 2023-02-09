import React from 'react'
import styles from "./styles/modal.module.css"
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion"

const DeleteModal = ({ setDeleteMode, deleteMode, confirmDeleteBtnClicked, modalStyles }) => {

    const deleteBtnClicked = () => {
        confirmDeleteBtnClicked();
    }
    const cancelBtnClicked = () => {
        setDeleteMode(false);
    }

    const stylesS = styles.wapper
    return (
        <AnimatePresence>
            {deleteMode &&
                <motion.div
                    className={
                        `${styles.modalWrapperOpen} ${modalStyles.modalWrapper}`

                    }
                    initial={{
                        scaleX: 0,
                        scaleY: 0,
                        y: -200
                    }}
                    animate={{
                        scaleX: 1,
                        scaleY: 1,
                        y: 0,
                        transition: {
                            duration: 0.05,
                            type: 'spring'
                        },

                    }}
                    exit={{
                        y: -200,
                        scaleX: 0,
                        scaleY: 0,
                        transition: {
                            duration: 0.1,
                            type: 'spring'

                        },
                    }}
                >
                    <div className={` ${styles.modalContainer} ${!deleteMode && styles.modalContainerClose} `} >
                        <div className={styles.iconContainer} >
                            <Icon icon="ph:warning" />
                        </div>
                        <div className={styles.dialogContainer} >
                            <div className={styles.textTopDiv} >
                                <p>Delete permanently</p>
                            </div>
                            <div className={styles.textBottomDiv} >
                                <p>This will Delete item permanently from Database.</p>
                            </div>

                        </div>
                        <div className={styles.btnContainer} >
                            <div className={styles.cancelBtnDiv} onClick={cancelBtnClicked}  >
                                <p>Cancel</p>
                            </div>
                            <div className={styles.deleteBtnDiv} onClick={deleteBtnClicked}  >
                                <p>Delete</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence >
    )
}

export default DeleteModal