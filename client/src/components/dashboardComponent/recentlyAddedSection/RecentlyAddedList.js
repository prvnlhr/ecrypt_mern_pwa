import React from 'react'
import styles from "./styles/recentlyAddedList.module.css"
import LoginId from "./LoginId"
import Card from './Card'
import Doc from './Doc'








const RecentlyAddedList = ({

    docFullScreenAct,
    setDocFullScreenAct,
    docFullScreenActData,
    setDocFullScreenActData
}) => {

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
            <LoginId />
            <Card />
            <Doc
                docFullScreenAct={docFullScreenAct}
                setDocFullScreenAct={setDocFullScreenAct}
                docFullScreenActData={docFullScreenActData}
                setDocFullScreenActData={setDocFullScreenActData}
            />
        </div>
    )
}

export default RecentlyAddedList