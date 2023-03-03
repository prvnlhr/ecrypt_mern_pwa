import React from 'react'
import styles from "./styles/recentlyAddedList.module.css"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import LoginId from "./LoginId"
import Card from './Card'
import Doc from './Doc'
import { rearrangeLoginIdsList } from "../../../redux/features/loginsId/loginsIdSlice"
import { rearrangeDocsList } from "../../../redux/features/docs/docsSlice"
import { rearrangeCardsList } from "../../../redux/features/cards/cardsSlice"
const RecentlyAddedList = ({
    recAddDocFullScreen, setRecAddDocFullScreen, recAddDocFullScreenData, setRecAddDocFullScreenData,
    clickedSearchItem,
    setClickedSearchItem
}) => {
    const recentlyAddedArray = useSelector((state => state.recentlyAdded.recentlyAddedData));
    const loginIdsArray = useSelector((state => state.loginIds.loginsIdData));
    const cardsArray = useSelector((state => state.cards.cardsData));
    const docsArray = useSelector((state) => state.docs.docsData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirectToList = async (item, listType, listPath) => {

        let index;
        switch (listType) {

            case 'logins':
                index = loginIdsArray.findIndex(currItem => currItem._id === item._id);
                dispatch(rearrangeLoginIdsList(index));
                break;

            case 'cards':
                index = cardsArray.findIndex(currItem => currItem._id === item._id);
                dispatch(rearrangeCardsList(index));
                break;
            case 'docs':
                index = docsArray.findIndex(currItem => currItem._id === item._id);
                dispatch(rearrangeDocsList(index));
                break;

            default:
                break;
        }
        setClickedSearchItem(item);
        navigate(listPath);
    }
    const handleItemClicked = (item) => {
        let newObj = {};

        if (item.hasOwnProperty('itemId')) {
            newObj = Object.assign({ _id: item.itemId }, item);
            item = newObj;
        }
        let listType;


        if (item.hasOwnProperty('imageName')) {
            listType = 'docs';

            redirectToList(item, listType, '/user/diplay_documents')
        }
        else if (item.hasOwnProperty('username')) {
            listType = 'logins';
            redirectToList(item, listType, '/user/display_loginIds')
        }
        else {
            listType = 'cards';
            redirectToList(item, listType, '/user/display_cards')
        }
    }


    const recentlyAddedData = [
        {
            "title": "Airtel App",
            "logoIndex": 3,
            "category": "Finance",
            "app": "Airtel Thanks",
            "username": "prvnlhr007@gmail.com ",
            "password": "prvnpr@12234",
            "isFavourite": false,

        },

        {
            "title": "Apple Id",
            "logoIndex": 9,
            "category": "Personal",
            "app": "icloud id",
            "username": "prvnlhr@icloud.com",
            "password": "prvn@icloud123",
            "isFavourite": false,

        },
        {
            "imageName": "Sample Doc 23",
            "imageUrl": "https://res.cloudinary.com/ecryptimgdb/image/upload/v1673197511/eCrypt/zg6lrrundf30x5irkksm.png",
            "cloudinary_id": "eCrypt/zg6lrrundf30x5irkksm",
            "isFavourite": false,

        },

        {
            "title": "SBI Debit card",
            "logoIndex": 72,
            "category": "Bank",
            "cardHolder": "Praveen Lohar",
            "cardNumber": "5242720014594202",
            "expiry": "23/54",
            "cvv": "789",
            "isFavourite": false,

        },

        {
            "title": "Praveen Aadhar Card",
            "logoIndex": 98,
            "category": "Identity",
            "cardHolder": "Praveen Mangilal Lohar",
            "cardNumber": "504186887569",
            "issueDate": "2012",
            "dob": "23/01",
            "isFavourite": false,
        },

        {
            "title": "Two Wheeler License",
            "logoIndex": 103,
            "category": "License",
            "cardHolder": "Klaus Michealson the orginal",
            "licenseNumber": "RJ/22/ADL-542/474/01",
            "expiry": "2036",
            "dob": "13/06",
            "isFavourite": false,
        }

    ]

    return (
        <div className={styles.recentAddedList} >
            {
                recentlyAddedArray.map((item) => (
                    item.hasOwnProperty('imageName') ?
                        <Doc
                            key={item._id} item={item}
                            recAddDocFullScreen={recAddDocFullScreen}
                            setRecAddDocFullScreen={setRecAddDocFullScreen}
                            recAddDocFullScreenData={recAddDocFullScreenData}
                            setRecAddDocFullScreenData={setRecAddDocFullScreenData}
                            handleItemClicked={handleItemClicked}
                        />
                        :
                        item.hasOwnProperty('username') ?
                            < LoginId key={item._id} item={item}
                                clickedSearchItem={clickedSearchItem}
                                setClickedSearchItem={setClickedSearchItem}
                                handleItemClicked={handleItemClicked}
                            />
                            :
                            <Card key={item._id} item={item}
                                clickedSearchItem={clickedSearchItem}
                                setClickedSearchItem={setClickedSearchItem}
                                handleItemClicked={handleItemClicked}
                            />
                ))
            }
            {/* <LoginId />
            <Card />
            <Doc
                recAddDocFullScreen={recAddDocFullScreen}
                setRecAddDocFullScreen={setRecAddDocFullScreen}
                recAddDocFullScreenData={recAddDocFullScreenData}
                setRecAddDocFullScreenData={setRecAddDocFullScreenData}
            /> */}
        </div>
    )
}

export default RecentlyAddedList