import {
    Grid,
    InputAdornment,
    makeStyles,
    ButtonGroup,
    FormControlLabel,
    Checkbox,
    Button as MuiButton,
} from "@material-ui/core"
import React, { useState, useEffect } from "react"
import Form from "../form/Form"
import Notification from "../notification/Notification"

import { Input } from "../controls"
import { useForm } from "../hooks/useForm"
import { createAPIEndpoint, ENDPOINTS } from "../../api"

import ReplayIcon from "@mui/icons-material/Replay"
import Inventory2Icon from "@mui/icons-material/Inventory2"

const getFreshModelObject = () => ({
    userId: 0,
    userName: "",
    firstName: "",
    lastName: "",
    contactNo: "",
    isVerified: false,
    isAdmin: false,
})

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

const StaffForm = () => {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls,
    } = useForm(getFreshModelObject)
    const classes = useStyles()
    const [staffId, setStaffId] = useState(0)
    const [notify, setNotify] = useState({ isOpen: false })

    const validateForm = () => {
        let temp = {}
        temp.userName = values.userName !== "" ? "" : "Username is required!"
        setErrors({ ...temp })
        return Object.values(temp).every((x) => x === "")
    }

    useEffect(() => {
        setValues({
            ...values,
        })
        // eslint-disable-next-line
    }, [JSON.stringify(values)])

    useEffect(() => {
        if (staffId === 0) resetFormControls()
    }, [staffId])

    const resetForm = () => {
        resetFormControls()
        setStaffId(0)
    }

    const submitProduct = (e) => {
        e.preventDefault()
        if (validateForm()) {
            createAPIEndpoint(ENDPOINTS.USERPOST)
                .create(values)
                .then((res) => {
                    resetFormControls()
                    setNotify({
                        isOpen: true,
                        message: "New staff created",
                    })
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <div>
            <Form onSubmit={submitProduct}>
                <Grid container>
                    <Grid item xs={6}>
                        <Input
                            disabled
                            label="Staff Id"
                            name="staffId"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        className={classes.adornmentText}
                                        position="start"
                                    >
                                        #
                                    </InputAdornment>
                                ),
                            }}
                            value={values.staffId}
                        />
                        <Input
                            label="Staff Username"
                            name="userName"
                            value={values.userName}
                            onChange={handleInputChange}
                            error={errors.staffId}
                        />
                        <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton
                                size="large"
                                type="submit"
                                endIcon={<Inventory2Icon />}
                            >
                                Submit
                            </MuiButton>
                            <MuiButton
                                size="small"
                                startIcon={<ReplayIcon />}
                                onClick={resetForm}
                            />
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="isAdmin"
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            isAdmin: e.target.checked,
                                        })
                                    }
                                    checked={values.isAdmin}
                                />
                            }
                            label="Admin privilege"
                        />
                    </Grid>
                </Grid>
            </Form>

            <Notification {...{ notify, setNotify }} />
        </div>
    )
}

export default StaffForm
