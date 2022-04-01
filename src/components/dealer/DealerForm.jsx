import {
    Grid,
    InputAdornment,
    makeStyles,
    ButtonGroup,
    FormControlLabel,
    Checkbox,
    Button as MuiButton,
} from "@material-ui/core"
import React, { useState, useEffect, useRef } from "react"
import Form from "../form/Form"
import Popup from "../popup/Popup"
import Notification from "../notification/Notification"

import { Input, Select, Button } from "../controls"
import { useForm } from "../hooks/useForm"
import { createAPIEndpoint, ENDPOINTS } from "../../api"

import ReplayIcon from "@mui/icons-material/Replay"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import ReorderIcon from "@mui/icons-material/Reorder"
import DealerList from "./DealerList"

import emailjs from "emailjs-com"

const getFreshModelObject = () => ({
    dealerId: 0,
    dealerName: "",
    dealerUsername: "",
    dealerLocation: "",
    dealerDiscount: 0,
    dealerTypeId: 0,
    isVerified: false,
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

export default function DealerForm({ match }) {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls,
    } = useForm(getFreshModelObject)
    const classes = useStyles()

    const [dealerTypeList, setDealerTypeList] = useState([])
    const [discountVal, setDiscountVal] = useState(0)
    const [dealerListVisibility, setDealerListVisibility] = useState(false)
    const [dealerId, setDealerId] = useState(0)
    const [notify, setNotify] = useState({ isOpen: false })

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.DEALERTYPE)
            .fetchAll()
            .then((res) => {
                let dealerTypeList = res.data.map((item) => ({
                    id: item.dealerTypeId,
                    title: item.type,
                    discount: item.discount,
                }))
                dealerTypeList = [
                    { id: 0, title: "--SELECT TYPE--", discount: 0 },
                ].concat(dealerTypeList)
                setDealerTypeList(dealerTypeList)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        match.params?.id && setDealerId(match.params.id)
    }, [match.params.id])

    const validateForm = () => {
        let temp = {}
        temp.dealerTypeId =
            values.dealerTypeId !== 0 ? "" : "This field is required!"
        temp.dealerUsername =
            values.dealerUsername !== "" ? "" : "Dealer Username is required!"
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
        if (dealerId === 0) resetFormControls()
        else {
            createAPIEndpoint(ENDPOINTS.DEALERBYID)
                .fetchById(dealerId)
                .then((res) => {
                    setValues(res.data)
                    setErrors({})
                })
                .catch((err) => console.log(err))
        }
        // eslint-disable-next-line
    }, [dealerId])
    const setDiscountInput = (dealerType) => {
        const found = dealerTypeList.find(({ id }) => id === dealerType)
        if (!found) return
        setDiscountVal(found.discount)
    }

    useEffect(() => {
        dealerTypeList && setDiscountInput(values.dealerTypeId)
        // eslint-disable-next-line
    }, [values, dealerTypeList])

    const resetForm = () => {
        resetFormControls()
        setDealerId(0)
    }

    const submitProduct = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            if (values.dealerId === 0) {
                let valueWithPassword = {
                    ...values,
                    dealerPassword: "111111",
                }
                createAPIEndpoint(ENDPOINTS.DEALERPOST)
                    .create(valueWithPassword)
                    .then((res) => {
                        console.log(res)
                        resetFormControls()
                        setNotify({
                            isOpen: true,
                            message: "New Dealer Info Added.",
                        })

                        console.log(e.target)

                        emailjs
                            .sendForm(
                                "gmail",
                                "template_xhngi7e",
                                e.target,
                                "user_NRGwl734dJZwKFhw84xEN"
                            )
                            .then(
                                (result) => {
                                    console.log(result.text)
                                },
                                (error) => {
                                    console.log(error.text)
                                }
                            )
                    })
                    .catch((err) => console.log(err))
            } else {
                createAPIEndpoint(ENDPOINTS.DEALERPUT)
                    .update(dealerId, values)
                    .then((res) => {
                        console.log(res)
                        setDealerId(0)
                        setNotify({
                            isOpen: true,
                            message: "Dealer Details Updated.",
                        })
                    })
                    .catch((err) => console.log(err))
            }
        }
    }

    const openListOfDealers = () => {
        setDealerListVisibility(true)
    }

    return (
        <div>
            <Form onSubmit={submitProduct}>
                <Grid container>
                    <Grid item xs={6}>
                        <Input
                            disabled
                            label="Dealer Id"
                            name="dealerId"
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
                            value={values.dealerId}
                        />
                        <Input
                            label="Dealer Username"
                            name="dealerUsername"
                            value={values.dealerUsername}
                            onChange={handleInputChange}
                            error={errors.dealerUsername}
                        />

                        <Input
                            label="Dealer Name"
                            name="dealerName"
                            value={values.dealerName}
                            onChange={handleInputChange}
                            error={errors.dealerName}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disabled
                                    checked={values?.isVerified || false}
                                />
                            }
                            label="Verified"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            label="Dealer type"
                            name="dealerTypeId"
                            onChange={handleInputChange}
                            options={dealerTypeList}
                            value={values.dealerTypeId}
                            error={errors.dealerTypeId}
                        />
                        <Input
                            label="Discount"
                            name="dealerDiscount"
                            value={values.dealerDiscount}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        className={classes.adornmentText}
                                        position="start"
                                    >
                                        %
                                    </InputAdornment>
                                ),
                            }}
                            disabled
                        />
                        <Input
                            label="Location"
                            name="dealerLocation"
                            value={values.dealerLocation}
                            onChange={handleInputChange}
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
                        <Button
                            size="large"
                            onClick={openListOfDealers}
                            startIcon={<ReorderIcon />}
                        >
                            Dealers
                        </Button>
                    </Grid>
                </Grid>
            </Form>

            <Popup
                title="List of dealers"
                openPopup={dealerListVisibility}
                setOpenPopup={setDealerListVisibility}
            >
                <DealerList
                    {...{
                        setDealerId,
                        setDealerListVisibility,
                        resetFormControls,
                        setNotify,
                    }}
                />
            </Popup>

            <Notification {...{ notify, setNotify }} />
        </div>
    )
}
