import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from "../styles/fullCardComponent.module.css"
import BackBtnIcon from "../../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import { logosArray, logosData } from "../../logoComponents/logosData";
import BankCardSubComponent from './BankCardSubComponent';
import IdentityCardSubComponent from './IdentityCardSubComponent';
import LicenseCardSubComponent from './LicenseCardSubComponent';
import LogoComponentWrapper from "../../logoComponents/LogoComponentWrapper"
import { editCardData, deleteCardData, toggleIsFav } from "../../../redux/features/cards/cardsSlice"
import { generateActivityData } from "../../utils/ActivityDataChangeFuction"
import BookmarksIcon from "../../icons/BookmarksIcon"
import BookmarksIconFill from "../../icons/BookmarksIconFill"
import { Oval } from 'react-loader-spinner'
const spinnerWrapper = {
    height: `100%`,
    with: `100%`,
}
const FullCardComponent = ({ showContentCard, setShowContentCard, handleFullContentBackBtnClicked,
    fullContentCardData, setFullContentCardData, editMode, setEditMode,
    confirmDeleteBtnClicked,
    setDeleteMode,
    deleteMode

}) => {

    const userId = useSelector((state) => state.user._id);
    const cardState = useSelector((state => state.cards));
    const { isLoading, action } = cardState;
    const isDarkMode = useSelector((state) => state.ui.darkMode);
    const [currFocusField, setCurrFocusField] = useState(undefined);
    const onFocus = (val) => {
        setCurrFocusField(val)
    }

    const [popUpOpen, setPopUpOpen] = useState(false);

    const [oldCardData, setOldCardData] = useState('');

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
        setOldCardData(fullContentCardData);
        setEditMode(true);
    }
    const cancelBtnClicked = () => {
        setFullContentCardData(oldCardData);
        setEditMode(false);
    }


    //> Handle save btn Clicked_______________
    const saveBtnClicked = () => {
        const activity_data = generateActivityData(3, 'Card', fullContentCardData, oldCardData)
        dispatch(editCardData({
            updatedData: fullContentCardData,
            card_id: fullContentCardData._id,
            activityData: activity_data,
            userId: userId
        })).then(res => {
            console.log(res.type);
            if (res.type === 'cards/edit/fulfilled') {
                setEditMode(false);
            }
        })

    }

    const deleteBtnClicked = () => {
        setDeleteMode(true);
    }

    const handleInputValueChange = (e) => {
        setFullContentCardData({
            ...fullContentCardData,
            [e.target.name]: e.target.value,
        })
    }
    //> Handle fav btn Clicked
    const favBtnClicked = () => {
        dispatch(toggleIsFav({
            card_id: fullContentCardData._id,
            isFav: !fullContentCardData.isFavourite,
            category: fullContentCardData.category
        }))
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
                                    {
                                        isLoading && action === 'edit' ?
                                            <Oval
                                                height={`90%`}
                                                width={`90%`}
                                                color="white"
                                                wrapperStyle={spinnerWrapper}
                                                wrapperClass={styles.spinner}
                                                visible={true}
                                                ariaLabel='oval-loading'
                                                secondaryColor="#E6E6E6"
                                                strokeWidth={5}
                                                strokeWidthSecondary={5}
                                                className={styles.spinner}
                                            />
                                            :
                                            <>
                                                <Icon className={styles.crudIcons} icon="charm:tick-double" color="white" />
                                                <p>Save</p>
                                            </>
                                    }

                                </div>

                                <div className={styles.cancelBtnDiv} onClick={cancelBtnClicked}>
                                    <Icon className={styles.crudIcons} icon="tabler:x" color="white" />
                                    <p>Cancel</p>
                                </div>
                            </>

                            :
                            <>
                                <div className={styles.deleteBtnDiv} onClick={deleteBtnClicked}  >
                                    {
                                        isLoading && action === 'delete' ?
                                            <Oval
                                                height={`90%`}
                                                width={`90%`}
                                                color="white"
                                                wrapperStyle={spinnerWrapper}
                                                wrapperClass={styles.spinner}
                                                visible={true}
                                                ariaLabel='oval-loading'
                                                secondaryColor="#E6E6E6"
                                                strokeWidth={5}
                                                strokeWidthSecondary={5}
                                                className={styles.spinner}
                                            />
                                            :
                                            <>
                                                <Icon className={styles.crudIcons} icon="gg:trash-empty" color="white" />
                                                <p>Delete</p>
                                            </>
                                    }

                                </div>
                                <div className={styles.editBtnDiv} onClick={editBtnClicked}  >
                                    <Icon className={styles.crudIcons} icon="ph:pencil-simple-line" color="#002A9A" />
                                    <p>Edit</p>
                                </div>
                            </>
                        }
                        <div className={styles.favBtnDiv} onClick={favBtnClicked} >
                            {
                                (isLoading === true && action === 'toggleFav') ?
                                    <Oval
                                        height={`80%`}
                                        width={`80%`}
                                        color={isDarkMode ? 'white' : '#002A9A'}
                                        wrapperStyle={spinnerWrapper}
                                        wrapperClass={styles.spinner}
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#E6E6E6"
                                        strokeWidth={5}
                                        strokeWidthSecondary={5}
                                        className={styles.spinner}
                                    /> :
                                    <>
                                        {fullContentCardData && fullContentCardData.isFavourite === true ?
                                            < BookmarksIconFill />
                                            :
                                            <BookmarksIcon />
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>


                <div className={styles.logoTitleWrapper} >
                    <div className={`${styles.logoTitleContainer}`} >

                        <div className={styles.logoContainer} onClick={logoclicked} >
                            <div className={
                                `${styles.logoDiv} ${editMode && styles.logoDivActive}`
                            }>
                                {fullContentCardData && fullContentCardData.logoIndex != undefined &&
                                    logosArray[fullContentCardData.logoIndex].logo
                                }
                            </div>

                        </div>


                        <div className={`${styles.titleContainer} ${(currFocusField === 1 && editMode) && styles.focusFieldStyle} `} >
                            <div className={styles.titleLabelDiv}>
                                <p className={styles.titleTitleText}>TITLE</p>
                            </div>
                            <div className={styles.titleInputDiv}>
                                <input
                                    className={editMode ? styles.titleInputActive : styles.titleInputNotActive}
                                    value={fullContentCardData && fullContentCardData.title}
                                    name={"title"}
                                    onFocus={() => onFocus(1)}
                                    onChange={handleInputValueChange}
                                    readOnly={editMode ? false : true}
                                />
                            </div>
                        </div>

                    </div>

                </div>

                <div className={styles.categoryWrapper} >
                    <div className={`${styles.categoryContainer} ${(currFocusField === 2 && editMode) && styles.focusFieldStyle} `} >
                        <div className={styles.categoryLabelDiv} >
                            <p>Category</p>
                        </div>
                        <div className={styles.catergoryInputDiv} >
                            <input
                                className={styles.categoryInput}
                                value={fullContentCardData && fullContentCardData.category}
                                readOnly={true}
                                onFocus={() => onFocus(2)}

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
                    {fullContentCardData &&
                        fullContentCardData.category === "Bank" ?
                        <BankCardSubComponent
                            setEditMode={setEditMode}
                            editMode={editMode}
                            fullContentCardData={fullContentCardData}
                            setFullContentCardData={setFullContentCardData}
                            onFocus={onFocus}
                            currFocusField={currFocusField}
                        />


                        : fullContentCardData && fullContentCardData.category === "Identity" ?
                            <IdentityCardSubComponent
                                setEditMode={setEditMode}
                                editMode={editMode}
                                fullContentCardData={fullContentCardData}
                                setFullContentCardData={setFullContentCardData}
                                onFocus={onFocus}
                                currFocusField={currFocusField}
                            />


                            : fullContentCardData && fullContentCardData.category === "License" ?
                                <LicenseCardSubComponent
                                    setEditMode={setEditMode}
                                    editMode={editMode}
                                    fullContentCardData={fullContentCardData}
                                    setFullContentCardData={setFullContentCardData}
                                    onFocus={onFocus}
                                    currFocusField={currFocusField}
                                /> :

                                null
                    }

                </div>



            </div>
        </div>
    )
}

export default FullCardComponent