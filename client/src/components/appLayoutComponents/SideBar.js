import React from 'react'
import AppLogo from './AppLogo'
import styles from "./styles/sidebar.module.css"
import { NavLink } from "react-router-dom";
const SideBar = () => {
    return (
        <div className={styles.sidebarComponent}>
            <div className={styles.logoSection} >
                <div className={styles.appLogoContainer}>
                    <AppLogo />
                </div>
            </div>
            <div className={styles.menuSection} >
                <div className={styles.linkContainer}>
                    <div className={styles.linkIconDiv}></div>
                    <div className={styles.linkDiv}>
                        <NavLink to="/" className={styles.linkText}
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                        color: 'black',
                                        fontWeight: 600,
                                    }
                                    : {
                                        color: '#7E8DA4',
                                    }
                            }>
                            Dashboard
                        </NavLink>
                    </div>
                </div>
                <div className={styles.linkContainer}>
                    <div className={styles.linkIconDiv}></div>
                    <div className={styles.linkDiv}>
                        <NavLink to="/user/display_loginIds" className={styles.linkText}
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                        color: 'black',
                                        fontWeight: 600,

                                    }
                                    : {
                                        color: '#7E8DA4',
                                    }
                            }>
                            Logins
                        </NavLink>
                    </div>
                </div>
                <div className={styles.linkContainer}>
                    <div className={styles.linkIconDiv}></div>
                    <div className={styles.linkDiv}>
                        <NavLink
                            to="/user/display_cards"

                            className={styles.linkText}
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                        color: 'black',
                                        fontWeight: 600,

                                    }
                                    : {
                                        color: '#7E8DA4',
                                    }
                            }
                        >
                            Cards
                        </NavLink>
                    </div>
                </div>
                <div className={styles.linkContainer}>
                    <div className={styles.linkIconDiv}></div>
                    <div className={styles.linkDiv}>
                        <NavLink to="/user/diplay_documents" className={styles.linkText}
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                        color: 'black',
                                        fontWeight: 600,

                                    }
                                    : {
                                        color: '#7E8DA4',
                                    }
                            }>
                            Docs
                        </NavLink>
                    </div>
                </div>
                <div className={styles.linkContainer}>
                    <div className={styles.linkIconDiv}></div>
                    <div className={styles.linkDiv}>
                        <NavLink to="/user/favorites/*" className={styles.linkText}
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                        color: 'black',
                                        fontWeight: 600,

                                    }
                                    : {
                                        color: '#7E8DA4',
                                    }
                            }>
                            Favorites
                        </NavLink>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideBar