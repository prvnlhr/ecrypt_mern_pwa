import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./styles/docInputForm.module.css"
import { Icon } from '@iconify/react';
import { HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { addNewDocData } from "../../redux/features/docs/docsSlice"
import { generateActivityData } from "../utils/ActivityDataChangeFuction"
import axios from "axios";

const DocInputForm = ({ setShowDocInputForm, showDocInputForm, formToggle }) => {
    const userId = useSelector((state) => state.user._id);

    const dispatch = useDispatch();
    const [name, setName] = useState();
    const [file, setFile] = useState();
    const [previewImg, setPreviewImg] = useState("");

    const previewFile = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = () => {
            setPreviewImg(reader.result);
        };
    };
    const closeBtnClicked = () => {
        setShowDocInputForm(false);
    }

    const uploadDoc = () => {
        formToggle();
        const data = new FormData();
        data.append("userId", userId);
        data.append("name", name);
        data.append("file", file);

        axios
            .post("https://httpbin.org/anything", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
            
        const toMakeActvityData = {
            title: name,
        }
        const activity_data = generateActivityData(1, 'Doc', toMakeActvityData, '');
        console.log(activity_data);
        console.log(data, name, userId)
        dispatch(addNewDocData({
            data: data,
            name: name,
            userId: userId,
            activityData: activity_data,
        }
        ));
    };
    const handleChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        previewFile(file);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        uploadDoc();
        // console.log(name, file);
    };
    return (
        <div className={styles.formWrapper}>
            <div className={styles.headerWrapper}>
                <div className={styles.closeIconDiv} onClick={closeBtnClicked}>
                    <Icon className={styles.closeIcon} icon="ph:x-bold" />
                </div>
            </div>


            <div className={styles.formContainer} >
                <form className={styles.formTag} onSubmit={handleFormSubmit}>
                    <div className={styles.uploadImgWrapper}>
                        <label htmlFor="file">
                            {previewImg ? (
                                <div className={styles.imgPreviewContainer}>
                                    <img src={previewImg} alt="doc" />
                                </div>
                            ) : (
                                <div className={styles.uploadContainer}>
                                    <svg className={styles.uploadIcon} viewBox="0 0 42 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M40.0066 25.5892C40.0066 35.6663 31.4385 43.8355 20.8693 43.8355C10.3 43.8355 1.73193 35.6663 1.73193 25.5892" stroke="black" stroke-width="2.4178" stroke-linecap="round" />
                                        <path d="M19.8087 30.9293C19.8154 31.5969 20.362 32.1327 21.0296 32.1261C21.6972 32.1194 22.2331 31.5728 22.2264 30.9052L19.8087 30.9293ZM21.5681 0.371786C21.0913 -0.0955891 20.3259 -0.0879618 19.8585 0.388822L12.2422 8.15848C11.7748 8.63527 11.7824 9.40066 12.2592 9.86804C12.736 10.3354 13.5014 10.3278 13.9688 9.851L20.7388 2.94464L27.6452 9.71471C28.122 10.1821 28.8874 10.1745 29.3547 9.69768C29.8221 9.22089 29.8145 8.4555 29.3377 7.98812L21.5681 0.371786ZM22.2264 30.9052L21.9306 1.22304L19.513 1.24713L19.8087 30.9293L22.2264 30.9052Z" fill="black" />
                                    </svg>

                                    <p className={styles.fileLabelText1} >Click to choose file</p>
                                    <p className={styles.fileLabelText2}>Supported file types are <span className={styles.spanText} >images, pdf</span></p>
                                </div>
                            )}
                        </label>
                        <input
                            type="file"
                            id="file"
                            className={styles.imgFileInput}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.titleWrapper}>
                        <div className={styles.titleIconWrapper} >
                            <Icon icon="tabler:file-invoice" color="#0473ff" />
                        </div>
                        <div className={styles.labelWrapper} >
                            <p className={styles.labelText}>Image title</p>
                        </div>
                        <div className={styles.inputWrapper} >
                            <input
                                className={styles.inputField}
                                required
                                type="text"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className={styles.buttonWrapper}>
                        <motion.button whileTap={{ scale: 0.95 }} type="submit">
                            <div className={styles.btnTextDiv} >
                                <p>Upload</p>
                            </div>

                            <div className={styles.btnIconDiv}>
                                <Icon icon="fluent:arrow-sort-up-24-filled" color='white'
                                    className={styles.btnIcon}
                                />
                            </div>

                        </motion.button>
                    </div>
                </form>

            </div>



        </div>
    )
}

export default DocInputForm