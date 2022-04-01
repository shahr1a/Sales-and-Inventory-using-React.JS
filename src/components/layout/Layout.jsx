import React, { useEffect } from 'react'
import { connect } from "react-redux";
import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import ThemeAction from '../../redux/actions/ThemeAction'

import { BrowserRouter, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { retrieveSession } from '../../redux/actions/AuthAction'
import AccountBox from '../accountBox';

const Layout = ({ retrieveSession }) => {

    const themeReducer = useSelector(state => state.ThemeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        retrieveSession()
    }, [retrieveSession])

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')
        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')
        dispatch(ThemeAction.setMode(themeClass))
        dispatch(ThemeAction.setColor(colorClass))
    }, [dispatch])
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    <Route path='/login' exact component={AccountBox} />
                    {
                        window.location.pathname !== "/login" && <><Sidebar {...props} />
                            <div className='layout__content'>
                                <TopNav />
                                <div className="layout__content-main">
                                    <Routes />
                                </div>
                            </div></>
                    }

                </div>
            )} />
        </BrowserRouter>
    )
}

export default connect(null, { retrieveSession })(Layout);
