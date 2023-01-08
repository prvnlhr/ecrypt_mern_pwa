import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import styles from "../styles/fullCardComponent.module.css"
import BackBtnIcon from "../../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import { logosArray, logosData } from "../../logoComponents/logosData";
import BankCardSubComponent from './BankCardSubComponent';
import IdentityCardSubComponent from './IdentityCardSubComponent';
import LicenseCardSubComponent from './LicenseCardSubComponent';
import LogoComponentWrapper from "../../logoComponents/LogoComponentWrapper"
import { editCardData, deleteCardData } from "../../../redux/features/cards/cardsSlice"
const FullCardComponent = ({ showContentCard, setShowContentCard, handleFullContentBackBtnClicked,
    fullContentCardData, setFullContentCardData, editMode, setEditMode

}) => {
    console.log(fullContentCardData)
    const [popUpOpen, setPopUpOpen] = useState(false);

    const [logoIndx, setLogoIndx] = useState(undefined);

    const [logoComponentShow, setLogoComponentShow] = useState(false);

    const dispatch = useDispatch();

    const handleOpClick = (op) => {

        // switch (op) {
        //     case "Identity":
        //         setIdentityCardData({
        //             ...identityCardData,
        //             category: op
        //         })
        //         break;

        //     case "License":
        //         setLicenseCardData({
        //             ...licenseCardData,
        //             category: op
        //         })
        //         break;

        //     case "Bank":
        //         setBankCardData({
        //             ...bankCardData,
        //             category: op
        //         })
        //         break;

        //     default:
        //         break;
        // }

        // setCurrData({
        //     ...currData,
        //     category: op
        // })
        setPopUpOpen(!popUpOpen)
    }

    const logoclicked = () => {
        if (editMode) {
            setLogoComponentShow(true);
        }

    }

    useEffect(() => {
        if (logoIndx !== undefined) {
            console.log(fullContentCardData, logoIndx)
            setFullContentCardData({
                ...fullContentCardData,
                logoIndex: logoIndx
            })
        }
    }, [logoIndx])

    const editBtnClicked = () => {
        setEditMode(true);
    }
    const cancelBtnClicked = () => {
        setEditMode(false);
    }

    const saveBtnClicked = () => {
        console.table(fullContentCardData)

        dispatch(editCardData({
            updatedData: fullContentCardData,
            card_id: fullContentCardData._id,
        }))
        setEditMode(false);
        setShowContentCard(false);

    }

    const deleteBtnClicked = () => {
        console.table(fullContentCardData._id, '63b43ab32fc8d3c100cafecc')
        dispatch(deleteCardData({
            card_id: fullContentCardData._id,
            user_id: '63b43ab32fc8d3c100cafecc',
            cardData: fullContentCardData
        }))
        setShowContentCard(false);
    }

    const handleInputValueChange = (e) => {
        setFullContentCardData({
            ...fullContentCardData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className={showContentCard ? styles.cardWrapper : styles.cardWrapperClose}>
            {logoComponentShow &&
                <LogoComponentWrapper
                    setLogoComponentShow={setLogoComponentShow}
                    logoIndx={logoIndx}
                    setLogoIndx={setLogoIndx}
                />
            }
            <div className={styles.cardContainer}>

                <div className={styles.cardHeader} >
                    <div className={styles.backBtnContainer} >
                        <div className={styles.backBtnDiv}
                            onClick={() => handleFullContentBackBtnClicked()}
                        >
                            <BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.curdBtnContainer} >

                        {editMode ?
                            <>
                                <div className={styles.saveBtnDiv} onClick={saveBtnClicked}  >
                                    <p>Save</p>
                                </div>

                                <div className={styles.cancelBtnDiv} onClick={cancelBtnClicked}>
                                    <p>Cancel</p>
                                </div>
                            </>

                            :
                            <>
                                <div className={styles.deleteBtnDiv} onClick={deleteBtnClicked}  >
                                    <p>Delete</p>
                                </div>
                                <div className={styles.editBtnDiv} onClick={editBtnClicked}  >
                                    <p>Edit</p>
                                </div>
                            </>
                        }
                    </div>
                </div>


                <div className={styles.logoTitleWrapper} >
                    <div className={styles.logoTitleContainer} >

                        <div className={styles.logoContainer} onClick={logoclicked} >
                            <div className={
                                editMode ? styles.logoDivActive : styles.logoDiv
                            }>
                                {fullContentCardData.logoIndex != undefined &&
                                    logosArray[fullContentCardData.logoIndex].logo
                                }
                            </div>

                        </div>


                        <div className={styles.titleContainer} >
                            <div className={styles.titleLabelDiv}>
                                <p className={styles.titleTitleText}>TITLE</p>
                            </div>
                            <div className={styles.titleInputDiv}>
                                <input
                                    className={editMode ? styles.titleInputActive : styles.titleInputNotActive}
                                    value={fullContentCardData.title}
                                    name={"title"}
                                    onChange={handleInputValueChange}
                                    readOnly={editMode ? false : true}
                                />
                            </div>
                        </div>

                    </div>

                </div>

                <div className={styles.categoryWrapper} >
                    <div className={styles.categoryContainer} >
                        <div className={styles.categoryLabelDiv} >
                            <p>Category</p>
                        </div>
                        <div className={styles.catergoryInputDiv} >
                            <input
                                className={styles.categoryInput}
                                value={fullContentCardData.category}
                                readOnly={true}

                            />
                            <div className={styles.popUpBtnIconDiv}>
                                <Icon
                                    className={styles.popUpIcon}
                                    icon="tabler:chevron-down" color="black" />
                            </div>

                            {
                                popUpOpen ? (
                                    <div className={styles.inputPopUpDiv}>
                                        <p className={styles.inputPopUpText}
                                            onClick={() => {
                                                handleOpClick("Identity")
                                            }}>
                                            Identity
                                        </p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("License")
                                        }}>License</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Bank")
                                        }}>Bank</p>

                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.subCardWrapper}>


                    {
                        fullContentCardData.category === "Bank" ?
                            <BankCardSubComponent
                                setEditMode={setEditMode}
                                editMode={editMode}
                                fullContentCardData={fullContentCardData}
                                setFullContentCardData={setFullContentCardData}
                            />


                            : fullContentCardData.category === "Identity" ?
                                <IdentityCardSubComponent
                                    setEditMode={setEditMode}
                                    editMode={editMode}
                                    fullContentCardData={fullContentCardData}
                                    setFullContentCardData={setFullContentCardData}
                                />


                                : fullContentCardData.category === "License" ?
                                    <LicenseCardSubComponent
                                        setEditMode={setEditMode}
                                        editMode={editMode}
                                        fullContentCardData={fullContentCardData}
                                        setFullContentCardData={setFullContentCardData}
                                    /> :

                                    null
                    }

                </div>



            </div>
        </div>
    )
}

export default FullCardComponent