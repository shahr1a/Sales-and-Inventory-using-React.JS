import React from "react"

import { Link } from "react-router-dom"

import "./sidebar.css"

import logo from "../../assets/images/logo.jpg"

import sidebar_items from "../../assets/JsonData/sidebar_routes.json"
import sidebar_items_dealer from "../../assets/JsonData/sidebar_routes_dealer.json"

const SidebarItem = (props) => {
    const active = props.active ? "active" : ""

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>{props.title}</span>
            </div>
        </div>
    )
}

const Sidebar = (props) => {
    const activeItem =
        localStorage.getItem("uType") === "staff"
            ? sidebar_items.findIndex(
                  (item) => item.route === props.location.pathname
              )
            : sidebar_items_dealer.findIndex(
                  (item) => item.route === props.location.pathname
              )
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img
                    src={logo}
                    alt="company logo"
                    style={{ borderRadius: "50px" }}
                />{" "}
                <span
                    style={{
                        fontWeight: 700,
                        fontSize: "3rem",
                    }}
                >
                    S{" "}
                    <span
                        style={{
                            color: "#57baf7",
                            fontWeight: 700,
                            fontSize: "3rem",
                        }}
                    >
                        I M
                    </span>
                </span>
            </div>

            {localStorage.getItem("uType") === "staff"
                ? sidebar_items.map((item, index) => (
                      <Link to={item.route} key={index}>
                          <SidebarItem
                              title={item.display_name}
                              icon={item.icon}
                              active={index === activeItem}
                          />
                      </Link>
                  ))
                : sidebar_items_dealer.map((item, index) => (
                      <Link to={item.route} key={index}>
                          <SidebarItem
                              title={item.display_name}
                              icon={item.icon}
                              active={index === activeItem}
                          />
                      </Link>
                  ))}
        </div>
    )
}

export default Sidebar
