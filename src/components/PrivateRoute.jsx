import React from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"

const PrivateRoute = ({
    isAuthenticated,
    loading,
    user,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) => {
            if (!loading) {
                if (!isAuthenticated) return <Redirect to="/login" />
                console.log(user.isVerified)
                if (!user.isVerified && window.location.pathname !== "/profile")
                    return <Redirect to="/profile" />
                return <Component {...props} />
            }
        }}
    />
)

const mapStateToProps = (state) => ({
    isAuthenticated: state.AuthReducer.isAuthenticated,
    loading: state.AuthReducer.loading,
    user: state.AuthReducer.user,
})

export default connect(mapStateToProps)(PrivateRoute)
