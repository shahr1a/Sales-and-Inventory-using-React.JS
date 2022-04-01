import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"
import { Typography, Button, Divider, Grid } from "@material-ui/core"

import Review from "./Review"
import { CreateOrder, PayOrder } from "../../redux/actions/OrderAction"

import {
    ORDER_PAY_RESET,
    ORDER_CREATE_RESET,
} from "../../redux/constants/orderConstants"

import { createAPIEndpoint, ENDPOINTS } from "../../api"
import { CART_RESET } from "../../redux/constants/cartConstants"

const PaymentForm = ({
    subTotal,

    nextStep,
}) => {
    const [notify, setNotify] = useState({ isOpen: false })

    const OrderCreate = useSelector((state) => state.OrderCreate)

    const { order, error, success, loading } = OrderCreate

    const Auth = useSelector((state) => state.AuthReducer)

    const { user } = Auth

    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)
    const [isPlaced, setIsPlaced] = useState(false)
    const cart = useSelector((state) => state.Cart)

    const OrderPay = useSelector((state) => state.OrderPay)
    const { loading: loadingPay, success: successPay } = OrderPay

    const min = 100000
    const max = 200000
    const rand = min + Math.random() * (max - min)

    const RandomOrderNumberGenerator = () => {
        return Math.trunc(rand).toString()
    }

    const { cartItems, shippingAddress } = cart

    // ASCte94Q43zbK7pQTgU861fkS_puHujFBCfRRyYl6kAfAKlm7wrZN7GgsQbQCZWfjZSQ274t0bT5aImV

    var sale = []

    var payment = {}

    let totalQuantity = 0

    for (var i = 0; i < cartItems.length; i++) {
        totalQuantity += cartItems[i].quantity
    }

    console.log(localStorage.getItem("uid"))

    var orderData = {
        orderNumber: "O - " + RandomOrderNumberGenerator(),
        approval: false,
        paymentMethod: "PayPal",
        isPaid: true,
        totalItem: totalQuantity,
        shippingAddress: shippingAddress.address1,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
    }

    for (var j = 0; j < cartItems.length; j++) {
        sale.push({
            saleId: cartItems[j].saleId,
            productId: cartItems[j].productId,
            dealerId: cartItems[j].dealerId,
            sellingPrice: cartItems[j].sellingPrice,
            isPaid: cartItems[j].isPaid,
            remainingBalance: cartItems[j].remainingBalance,
            paymentMethod: cartItems[j].paymentMethod,
            quantity: cartItems[j].quantity,
            approval: cartItems[j].approval,
        })
    }

    const AddPayPalScript = () => {
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src =
            "https://www.paypal.com/sdk/js?client-id=ASCte94Q43zbK7pQTgU861fkS_puHujFBCfRRyYl6kAfAKlm7wrZN7GgsQbQCZWfjZSQ274t0bT5aImV"

        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }

        document.body.appendChild(script)
    }

    const placeSale = async (s) => {
        if (s) {
            let newSale = sale.map((i) => {
                i.dealerId = user.dealerId
                i.orderId = order.orderId
                return i
            })

            for (var i = 0; i < newSale.length; i++) {
                console.log(`Sale ${i}: `, newSale[i])
                await createAPIEndpoint(ENDPOINTS.SALEPOST)
                    .create(newSale[i])
                    .catch((err) => console.log(err))
            }
            setNotify({
                isOpen: true,
                message: "Order Placed Successfully",
            })
        }
    }

    useEffect(() => {
        if (!loading && success) {
            placeSale(success)
            setIsPlaced(true)
            console.log(payment)
            if (!order.isPaid) {
                if (!window.paypal) {
                    AddPayPalScript()
                } else {
                    setSdkReady(true)
                }
            }
        }
    }, [success, loading])

    useEffect(() => {
        if (successPay) {
            nextStep({ order })
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
            dispatch({ type: CART_RESET })
        }
    }, [successPay])

    const placeOrder = async () => {
        if (user) {
            orderData.dealerId = user.dealerId
            console.log(orderData)
            dispatch(CreateOrder(orderData))
        }
    }

    const SuccessPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        payment = {
            paymentMethod: "PayPal",
            amountPaid: subTotal,
            paymentDate: paymentResult.create_time,
            orderId: order.orderId,
        }
        console.log(payment)
        dispatch(PayOrder(payment))
    }
    return (
        <>
            <Review cartItems={cartItems} subTotal={subTotal} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
                Payment Method
            </Typography>
            {!isPlaced && (
                <Button
                    onClick={placeOrder}
                    type="submit"
                    variant="contained"
                    // disabled={!stripe}
                    color="primary"
                >
                    PLACE ORDER
                </Button>
            )}
            {success && (
                <Grid container>
                    <PayPalButton
                        amount={Number(subTotal)}
                        onSuccess={SuccessPaymentHandler}
                    />
                </Grid>
            )}
        </>
    )
}

export default PaymentForm
