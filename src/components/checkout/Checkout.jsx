import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Divider,
    Button,
} from "@material-ui/core"

import useStyles from "./styles"
import AccountBox from "../accountBox/index"
import AddressForm from "./AddressForm"
import PaymentForm from "./PaymentForm"

const steps = ["Login", "Shipping Address", "Payment Details", "Confirmation"]

const Checkout = ({ onCaptureCheckout, order }) => {
    const [activeStep, setActiveStep] = useState(1)
    const [shippingData, setShippingData] = useState({})
    const classes = useStyles()

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)

        nextStep()
    }

    const cart = useSelector((state) => state.Cart)

    // const orderFromRedux = useSelector((state) => state.OrderCreate)

    const { cartItems } = cart

    let subTotal = 0

    for (var i = 0; i < cartItems.length; i++) {
        subTotal +=
            Number(cartItems[i].sellingPrice) * Number(cartItems[i].quantity)
    }

    const Confirmation = () => (
        <>
            <div>
                <Typography variant="h5">
                    Thank you for your purchase
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref:</Typography>
            </div>
            <br />
            <Button
                component={Link}
                to="/Shop"
                variant="outlined"
                type="button"
            >
                Back to Home
            </Button>
        </>
    )

    const Form = () =>
        activeStep === 0 ? (
            <AccountBox next={next} />
        ) : activeStep === 1 ? (
            <AddressForm next={next} />
        ) : activeStep === 2 ? (
            <PaymentForm
                shippingData={shippingData}
                cartItems={cartItems}
                subTotal={subTotal}
                next={next}
                nextStep={nextStep}
                backStep={backStep}
                onCaptureCheckout={onCaptureCheckout}
            />
        ) : (
            <Confirmation />
        )

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
