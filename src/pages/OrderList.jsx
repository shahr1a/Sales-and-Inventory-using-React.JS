import { Grid, Button as MuiButton, ButtonGroup } from "@mui/material"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import InfoIcon from "@mui/icons-material/Info"
import PaymentIcon from "@mui/icons-material/Payment"
import Popup from "../components/popup/Popup"
import { useSelector } from "react-redux"

import Table from "../components/table/Table"
import { createAPIEndpoint, ENDPOINTS } from "../api"
import OrderDetail from "../components/order/OrderDetail"
import Notification from "../components/notification/Notification"

const orderListTableHead = [
    "Order Number",
    "Approval",
    "Total Item",
    "Payment Status",
    "Order Date",
]

const renderHead = (item, index) => <th key={index}>{item}</th>

function OrderList() {
    const [orderList, setOrderList] = useState([])

    const [orderDetailVisibility, setOrderDetailVisibility] = useState(false)

    const [notify, setNotify] = useState({ isOpen: false })

    const Auth = useSelector((state) => state.AuthReducer)

    const { user } = Auth

    const newOrderList = orderList.filter((o) => o.dealer === user.dealerId)

    console.log(newOrderList)

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.orderNumber}</td>
            {user.dealerId ? (
                <td>{item.approval ? "Approved" : "Pending"}</td>
            ) : (
                <td>
                    {item.approval ? (
                        "Approved"
                    ) : (
                        <ButtonGroup>
                            <MuiButton
                                // LinkComponent={Link}
                                // to={`/orderDetail/${item.orderId}`}
                                size="small"
                                variant="contained"
                                color="primary"
                                endIcon={<InfoIcon />}
                                onClick={() => orderApprove(item.orderId, item)}
                            >
                                Approve Now
                            </MuiButton>
                        </ButtonGroup>
                    )}
                </td>
            )}

            <td>{item.totalItem}</td>
            <td>
                {item.isPaid ? (
                    "Paid"
                ) : (
                    <ButtonGroup>
                        <MuiButton
                            LinkComponent={Link}
                            to={`/orderDetail/${item.orderId}`}
                            size="small"
                            variant="contained"
                            color="primary"
                            endIcon={<PaymentIcon />}
                        >
                            Pay Now
                        </MuiButton>
                    </ButtonGroup>
                )}
            </td>
            <td>
                Date: {item.orderGeneratedOn.split("T")[0]}, Time:{" "}
                {item.orderGeneratedOn.split("T")[1].split(".")[0]}
            </td>
            <td>
                <ButtonGroup>
                    <MuiButton
                        // LinkComponent={Link}
                        // to={`/orderDetail/${item.orderId}`}
                        size="small"
                        variant="contained"
                        color="primary"
                        endIcon={<InfoIcon />}
                        onClick={() => openOrderDetail(item.orderId)}
                    >
                        Order Detail
                    </MuiButton>
                </ButtonGroup>
            </td>
        </tr>
    )

    useEffect(() => {})

    const [id, setId] = useState(0)

    const openOrderDetail = (id) => {
        setId(id)
        setOrderDetailVisibility(true)
    }

    const orderApprove = (id, item) => {
        console.log(id)
        let approveData = {
            orderNumber: item.orderNumber,
            orderGeneratedOn: item.orderGeneratedOn,
            approval: true,
            paymentMethod: item.paymentMethod,
            paymentData: item.paymentData,
            isPaid: true,
            totalItem: item.totalItem,
            shippingAddress: item.shippingAddress,
            city: item.city,
            postalCode: item.postalCode,
            dealerId: item.dealerId,
        }

        createAPIEndpoint(ENDPOINTS.ORDERAPPROVEPUT)
            .update(id, approveData)
            .then((res) => {
                setNotify({
                    isOpen: true,
                    message: "Order Approved!",
                })
                setTimeout(() => {
                    window.location.reload(1)
                }, 3000)
            })
            .catch((err) => {
                setNotify({
                    isOpen: true,
                    message: "Unable to approve order!",
                })
            })
    }

    useEffect(() => {
        async function fetchOrderList() {
            const { data } = await createAPIEndpoint(ENDPOINTS.ORDER).fetchAll()

            if (user.dealerId) {
                setOrderList(data.filter((o) => o.dealerId === user.dealerId))
            } else setOrderList(data)
        }

        fetchOrderList()
    }, [user.dealerId])

    return (
        <>
            <Grid>
                <Grid container>
                    <Grid item justify="flex-start">
                        <h2 className="page-header">Orders List</h2>
                    </Grid>
                </Grid>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <Grid container justifyContent="flex-end">
                                <MuiButton variant="contained">
                                    <Link to="/productAdd">
                                        Place Another Order
                                    </Link>
                                </MuiButton>
                            </Grid>
                            <div className="card__body">
                                {console.log(orderList)}
                                <Table
                                    limit="10"
                                    headData={orderListTableHead}
                                    renderHead={(item, index) =>
                                        renderHead(item, index)
                                    }
                                    bodyData={orderList}
                                    renderBody={(item, index) =>
                                        renderBody(item, index)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>

            <Popup
                title="Order Details"
                openPopup={orderDetailVisibility}
                setOpenPopup={setOrderDetailVisibility}
            >
                <OrderDetail id={id} />
            </Popup>

            <Notification {...{ notify, setNotify }} />
        </>
    )
}

export default OrderList
