import React from "react"

import "./topnav.css"

import { Link } from "react-router-dom"

import Dropdown from "../dropdown/Dropdown"

import ThemeMenu from "../thememenu/ThemeMenu"
import { ShoppingCart } from "@mui/icons-material"

import notifications from "../../assets/JsonData/notification.json"

import user_image from "../../assets/images/default.png"

import { useSelector } from "react-redux"

import { IconButton, Badge } from "@material-ui/core"
import { useLocation } from "react-router-dom"

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user_image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user ? (
                user.userType === "staff" ? (
                    user.userName
                ) : (
                    user.dealerName
                )
            ) : (
                <Link to="/login">Login</Link>
            )}
        </div>
    </div>
)

const Topnav = () => {
    const authReducer = useSelector((state) => state.AuthReducer)
    const cartReducer = useSelector((state) => state.Cart)
    const location = useLocation()

    return (
        <div className="topnav">
            <Link to={`/search`} underline="none">
                {location.pathname !== "/search" && (
                    <div className="topnav__search">
                        <input type="text" placeholder="Search here..." />
                        <i className="bx bx-search"></i>
                    </div>
                )}
            </Link>

            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(authReducer.user)}
                    />
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon="bx bx-bell"
                        badge="12"
                        contentData={notifications}
                        renderItems={(item, index) =>
                            renderNotificationItem(item, index)
                        }
                        renderFooter={() => <Link to="/">View All</Link>}
                    />
                    {/* dropdown here */}
                </div>
                <div className="topnav__right-item">
                    <IconButton aria-label="Show cart items" color="inherit">
                        <Link to={`/Cart`} underline="none">
                            <Badge
                                badgeContent={cartReducer.cartItems.length}
                                color="secondary"
                            >
                                <ShoppingCart fontSize="large" />
                            </Badge>
                        </Link>
                    </IconButton>
                </div>
                <div className="topnav__right-item">
                    {/* theme setting */}
                    <ThemeMenu />
                </div>
            </div>
        </div>
    )
}

export default Topnav
