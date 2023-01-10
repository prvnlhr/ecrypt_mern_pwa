import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import styles from "./styles/docInputForm.module.css"
import { Icon } from '@iconify/react';
import { HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { addNewDocData } from "../../redux/features/docs/docsSlice"
import { generateActivityData } from "../utils/ActivityDataChangeFuction"
import axios from "axios";

const DocInputForm = ({ setShowDocInputForm, showDocInputForm, formToggle }) => {

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
            // console.log(reader.result);
        };
    };
    const closeBtnClicked = () => {
        setShowDocInputForm(false);
    }
    const uploadDoc = () => {
        formToggle();
        const data = new FormData();
        data.append("userId", '63b43ab32fc8d3c100cafecc');
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
        console.log(data, name, '63b43ab32fc8d3c100cafecc')
        dispatch(addNewDocData({
            data: data,
            name: name,
            userId: '63b43ab32fc8d3c100cafecc',
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


            <div className={styles.formContainerWrapper} >
                <form className={styles.formTag} onSubmit={handleFormSubmit}>
                    <div className={styles.headingWrapper}>
                        <p className={styles.heading1}>Upload your file</p>
                        <p className={styles.heading2}>File should be image</p>
                    </div>
                    <div className={styles.uploadImgWrapper}>
                        <label htmlFor="file">
                            {previewImg ? (
                                <div className={styles.imgPreviewContainer}>
                                    <img src={previewImg} alt="doc" />
                                </div>
                            ) : (
                                <div className={styles.uploadContainer}>
                                    <Icon icon="bi:folder-fill" className={styles.folderIcon} />
                                    <p>Click to choose file</p>
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
                        <div className={styles.labelDiv}>
                            <p className={styles.labelText}>Image title</p>
                        </div>

                        <div className={styles.inputDiv}>
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
                            <p>Upload</p>
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