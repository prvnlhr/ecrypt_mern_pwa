import React from 'react'
import { useState, useRef, useEffect } from "react";
import AppLogo from './AppLogo'
import styles from "./styles/sidebar.module.css"
import { Link, NavLink, useLocation } from "react-router-dom";
import DashboardIcon from '../icons/DashboardIcon';
import LoginIdsIcon from '../icons/LoginIdsIcon';
import CardsIcon from '../icons/CardsIcon';
import DocsIcon from '../icons/DocsIcon';
import BookmarksFillIcon from '../icons/BookmarksFillIcon';
const SideBar = (
    { clickedSearchItem,
        setClickedSearchItem }
) => {
    const refDash = useRef();
    const refLogins = useRef();
    const refCards = useRef();
    const refNotes = useRef();
    const refFavs = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        if (indicatorRef.current !== null) {
            switch (location.pathname) {
                case "/":
                    var pos = refDash.current.offsetTop;
                    var newPos = pos + "px";
                    indicatorRef.current.style.top = newPos;
                    break;
                case "/user/display_loginIds":
                    var pos = refLogins.current.offsetTop;
                    var newPos = pos + "px";
                    indicatorRef.current.style.top = newPos;
                    break;
                case "/user/display_cards":
                    var pos = refCards.current.offsetTop;
                    var newPos = pos + "px";
                    indicatorRef.current.style.top = newPos;
                    break;
                case "/user/diplay_documents":
                    var pos = refNotes.current.offsetTop;
                    var newPos = pos + "px";
                    indicatorRef.current.style.top = newPos;
                    break;
                case "/user/favorites/logins":
                    var pos = refFavs.current.offsetTop;
                    var newPos = pos + "px";
                    indicatorRef.current.style.top = newPos;
                    break;
                case "/user/favorites/cards":
                    var pos = refFavs.current.offsetTop;
                    var newPos = pos + "px";
                    indicatorRef.current.style.top = newPos;
                    break;
                case "/user/favorites/docs":
                    var pos = refFavs.current.offsetTop;
                    var newPos = pos + "px";
                    indicatorRef.current.style.top = newPos;
                    break;
                default:
                    break;
            }
        }

    }, [indicatorRef.current])



    const linkedClicked = (val) => {

        //> before changing route, check if search item is present, if yes then, clear it
        //> to prevent scrolling to search item when revisting the page of search item
        if (clickedSearchItem !== undefined) {
            setClickedSearchItem(undefined);
        }

        switch (val) {
            case 1:
                var pos = refDash.current.offsetTop;
                var newPos = pos + "px";
                indicatorRef.current.style.top = newPos;
                break;
            case 2:
                var pos = refLogins.current.offsetTop;
                var newPos = pos + "px";
                indicatorRef.current.style.top = newPos;
                break;
            case 3:
                var pos = refCards.current.offsetTop;
                var newPos = pos + "px";
                indicatorRef.current.style.top = newPos;
                break;
            case 4:
                var pos = refNotes.current.offsetTop;
                var newPos = pos + "px";
                indicatorRef.current.style.top = newPos;
                break;
            case 5:
                var pos = refFavs.current.offsetTop;
                var newPos = pos + "px";
                indicatorRef.current.style.top = newPos;
                break;
            default:
                break;
        }

    }

    return (
        <div className={styles.sidebarComponent}>
            <div className={styles.logoSection} >
                <div className={styles.appLogoContainer}>
                    <AppLogo />
                </div>
            </div>
            <div className={styles.menuSection} >
                <div className={styles.sidebarIndicator} ref={indicatorRef} ></div>

                <Link className={styles.linkWrapper} to='/' ref={refDash} onClick={() => linkedClicked(1)} >
                    <div className={styles.linkIconContainer}>
                        <div className={styles.iconDiv} >
                            <DashboardIcon />
                        </div>
                    </div>
                    <div className={styles.linkTextDiv}>
                        <p className={styles.linkText} >Dashboard</p>
                    </div>

                </Link>
                <Link className={styles.linkWrapper} to='/user/display_loginIds' ref={refLogins} onClick={() => linkedClicked(2)}>
                    <div className={styles.linkIconContainer}>
                        <div className={styles.iconDiv} >
                            <LoginIdsIcon />
                        </div>
                    </div>
                    <div className={styles.linkTextDiv}>
                        <p className={styles.linkText} >Logins</p>
                    </div>
                </Link>
                <Link className={styles.linkWrapper} to='/user/display_cards' ref={refCards} onClick={() => linkedClicked(3)}>
                    <div className={styles.linkIconContainer}>
                        <div className={styles.iconDiv} >
                            <CardsIcon />
                        </div>
                    </div>
                    <div className={styles.linkTextDiv}>
                        <p className={styles.linkText} >Cards</p>
                    </div>
                </Link>
                <Link className={styles.linkWrapper} to='/user/diplay_documents' ref={refNotes} onClick={() => linkedClicked(4)}>
                    <div className={styles.linkIconContainer}>
                        <div className={styles.iconDiv} >
                            <DocsIcon />
                        </div>
                    </div>
                    <div className={styles.linkTextDiv}>
                        <p className={styles.linkText} >Docs</p>
                    </div>
                </Link>
                <Link className={styles.linkWrapper} to='/user/favorites/logins' ref={refFavs} onClick={() => linkedClicked(5)}>
                    <div className={styles.linkIconContainer}>
                        <div className={styles.iconDiv} >
                            <BookmarksFillIcon />
                        </div>

                    </div>
                    <div className={styles.linkTextDiv}>
                        <p className={styles.linkText} >Favorites</p>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default SideBar