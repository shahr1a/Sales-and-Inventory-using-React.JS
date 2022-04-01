import {
    Grid,
    makeStyles,
    ButtonGroup,
    FormControlLabel,
    Checkbox,
    Button as MuiButton,
} from "@material-ui/core"
import React, { useState, useEffect } from "react"
import Form from "../components/form/Form"
import AuthAction from "../redux/actions/AuthAction"
import { Input } from "../components/controls"
import { createAPIEndpoint, ENDPOINTS } from "../api"

import Inventory2Icon from "@mui/icons-material/Inventory2"
import { connect, useDispatch } from "react-redux"
import Notification from "../components/notification/Notification"

const useStyles = makeStyles((theme) => ({
    adornmentText: {
        "& .MuiTypography-root": {
            color: "#f3b33d",
            fontWeight: "bolder",
            fontSize: "1.5em",
        },
    },
    submitButtonGroup: {
        backgroundColor: "#f3b33d",
        color: "#000",
        margin: theme.spacing(1),
        "& .MuiButton-label": {
            textTransform: "none",
        },
        "&:hover": {
            backgroundColor: "#f3b33d",
        },
    },
}))

const Profile = ({ user }) => {
    const classes = useStyles()
    const [values, setValues] = useState({
        userName: "",
        contactNo: "",
        firstName: "",
        lastName: "",
        password: "",
    })
    const [dealerValues, setDealerValues] = useState({
        dealerLocation: "",
        dealerName: "",
        dealerUsername: "",
        dealerPassword: "",
    })
    const [notify, setNotify] = useState({ isOpen: false })
    const dispatch = useDispatch()
    const handleInputChange = (e) =>
        setValues({ ...values, [e.target.name]: e.target.value })
    const handleDealerChange = (e) =>
        setDealerValues({ ...dealerValues, [e.target.name]: e.target.value })

    useEffect(() => {
        if (user) {
            if (user.userType === "staff")
                createAPIEndpoint(ENDPOINTS.USERBYID)
                    .fetchById(user.userId)
                    .then((res) => {
                        setValues(res.data)

                        console.log(res.data)
                        if (!res.data.isVerified)
                            setNotify({
                                isOpen: true,
                                message: "Update info and verify account",
                            })
                    })
                    .catch((err) => console.log(err))
            else
                createAPIEndpoint(ENDPOINTS.DEALERBYID)
                    .fetchById(user.dealerId)
                    .then((res) => {
                        setDealerValues(res.data)
                        if (!res.data.isVerified)
                            setNotify({
                                isOpen: true,
                                message: "Update info and verify account",
                            })
                    })
                    .catch((err) => console.log(err))
        }
        // eslint-disable-next-line
    }, [user])

    const submitProduct = (e) => {
        e.preventDefault()
        if (values.userType === "staff") {
            createAPIEndpoint(ENDPOINTS.USERPUT)
                .update(user.userId, { ...values, isVerified: true })
                .then((res) => {
                    setNotify({
                        isOpen: true,
                        message: "Profile Updated.",
                    })
                })
                .catch((err) => console.log(err.response))
        } else {
            createAPIEndpoint(ENDPOINTS.DEALERPUT)
                .update(user.dealerId, { ...dealerValues, isVerified: true })
                .then((res) => {
                    setNotify({
                        isOpen: true,
                        message: "Profile Updated.",
                    })
                })
                .catch((err) => console.log(err))
        }
        dispatch(AuthAction.verifyUser())
    }

    if (!user) return null
    return (
        <div>
            <Form onSubmit={submitProduct}>
                <Grid container>
                    <Grid item xs={6}>
                        {user.userType === "staff" ? (
                            <>
                                <Input
                                    label="Username"
                                    name="userName"
                                    value={values.userName}
                                    onChange={handleInputChange}
                                    disabled
                                />
                                <Input
                                    label="Contact"
                                    name="contactNo"
                                    value={values.contactNo ?? ""}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    required
                                    name="password"
                                    value={values.password ?? ""}
                                    onChange={handleInputChange}
                                />
                            </>
                        ) : (
                            <>
                                <Input
                                    label="Username"
                                    name="dealerUsername"
                                    value={dealerValues.dealerUsername}
                                    onChange={handleDealerChange}
                                    disabled
                                />
                                <Input
                                    label="Location"
                                    name="dealerLocation"
                                    value={dealerValues.dealerLocation ?? ""}
                                    onChange={handleDealerChange}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled
                                            checked={
                                                dealerValues?.isVerified ||
                                                false
                                            }
                                        />
                                    }
                                    label="Verified (Update password to verify)"
                                />
                            </>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        {user.userType === "staff" ? (
                            <>
                                <Input
                                    label="Firsr Name"
                                    name="firstName"
                                    value={values.firstName ?? ""}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    label="Last Name"
                                    name="lastName"
                                    value={values.lastName ?? ""}
                                    onChange={handleInputChange}
                                />
                            </>
                        ) : (
                            <>
                                <Input
                                    label="Full Name"
                                    name="dealerName"
                                    value={dealerValues.dealerName ?? ""}
                                    onChange={handleDealerChange}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    required
                                    name="dealerPassword"
                                    value={dealerValues.dealerPassword ?? ""}
                                    onChange={handleDealerChange}
                                />
                            </>
                        )}

                        <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton
                                size="large"
                                type="submit"
                                endIcon={<Inventory2Icon />}
                            >
                                Update
                            </MuiButton>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Form>
            <Notification {...{ notify, setNotify }} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.AuthReducer.user,
})

export default connect(mapStateToProps)(Profile)
