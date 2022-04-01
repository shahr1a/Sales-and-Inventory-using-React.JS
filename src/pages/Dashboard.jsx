import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom"

import Chart from "react-apexcharts"

import { useSelector } from "react-redux"

import StatusCard from "../components/status-card/StatusCard"

import Table from "../components/table/Table"

import Badge from "../components/badge/Badge"

import { createAPIEndpoint, ENDPOINTS } from "../api"
import {
    GetAllDealer,
    GetOrderDealers,
    GetAllOrder,
    GetAllPayment,
    GetSpendingForDealer,
} from "../resource/dealerInfo"

// import ThemeAction from "../redux/actions/ThemeAction"

const chartOptions = {
    series: [
        {
            name: "Online Customers",
            data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
        },
        {
            name: "Store Customer",
            data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
        },
    ],
    options: {
        color: ["#6ab04c", "#2980b9"],
        chart: {
            background: "transparent",
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
            ],
        },
        legend: {
            position: "top",
        },
        grid: {
            show: false,
        },
    },
}

const topCustomers = {
    head: ["user", "total orders", "total spending"],
    body: [
        {
            username: "john doe",
            order: "490",
            price: "$15,870",
        },
        {
            username: "frank iva",
            order: "250",
            price: "$12,251",
        },
        {
            username: "anthony baker",
            order: "120",
            price: "$10,840",
        },
        {
            username: "frank iva",
            order: "110",
            price: "$9,251",
        },
        {
            username: "anthony baker",
            order: "80",
            price: "$8,840",
        },
    ],
}

const renderCustomerHead = (item, index) => <th key={index}>{item}</th>

const renderCustomerBody = (item) => (
    <tr key={item.dealerId}>
        <td>{item.dealerName}</td>
        <td>{item.totalOrder}</td>
        <td>{item.totalSpending}</td>
    </tr>
)

const latestOrders = {
    header: ["order id", "Order Generated", "Approval", "status"],
    body: [
        {
            id: "#0D1711",
            user: "john doe",
            date: "17 Jun 2021",
            price: "$900",
            status: "shipping",
        },
        {
            id: "#0D1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid",
        },
        {
            id: "#0D1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "pending",
        },
        {
            id: "#0D1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid",
        },
        {
            id: "#0D1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "refund",
        },
    ],
}

const renderOrderHead = (item, index) => <th key={index}>{item}</th>

const renderOrderBody = (item, index) => (
    <tr key={item.orderId}>
        <td>{item.orderId}</td>
        {/* <td>{item.dealer.dealerName}</td> */}
        <td>
            Date: {item.orderGeneratedOn.split("T")[0]}, Time:{" "}
            {item.orderGeneratedOn.split("T")[1].split(".")[0]}
        </td>
        <td>{item.approval ? "Approved" : "Pending"}</td>
        <td>
            <Badge
                type={item.isPaid ? "paid" : "unpaid"}
                content={item.isPaid ? "PAID" : "UNPAID"}
            />
        </td>
    </tr>
)

const Dashboard = () => {
    const themeReducer = useSelector((state) => state.ThemeReducer.mode)

    const [statusCard, setStatusCard] = useState([])
    const [loading, setLoading] = useState(true)
    const [dealerOrderDetails, setDealerOrderDetails] = useState([])
    const [latestOrder, setLatestOrder] = useState([])
    const [latestOrderById, setLatestOrderById] = useState([])

    useEffect(() => {
        async function fetch() {
            const orderCount = GetOrderDealers(
                await GetAllDealer(),
                await GetAllOrder()
            )
            const totalSpend = GetSpendingForDealer(
                await GetAllDealer(),
                await GetAllOrder(),
                await GetAllPayment()
            )

            const result = orderCount.map((o) => {
                for (let i = 0; i < totalSpend.length; i++) {
                    if (totalSpend[i].dealerId === o.dealerId) {
                        return {
                            ...o,
                            totalSpending: totalSpend[i].total,
                        }
                    }
                }
            })

            setDealerOrderDetails(result)
        }
        fetch()
    }, [])

    useEffect(() => {
        if (localStorage.getItem("uType") === "staff") {
            async function fetch() {
                const saleResponse = await createAPIEndpoint(
                    ENDPOINTS.SALE
                ).fetchAll()
                const orderResponse = await createAPIEndpoint(
                    ENDPOINTS.ORDER
                ).fetchAll()
                const paymentResponse = await createAPIEndpoint(
                    ENDPOINTS.PAYMENT
                ).fetchAll()
                let totalPayment = 0
                paymentResponse.data.forEach((element) => {
                    totalPayment += Number(element.amountPaid)
                })
                // console.log(saleResponse)
                setStatusCard([
                    {
                        icon: "bx bx-shopping-bag",
                        count: saleResponse.data.length,
                        title: "Total sales",
                        type: "string",
                    },
                    {
                        icon: "bx bx-receipt",
                        count: orderResponse.data.length,
                        title: "Total orders",
                        type: "string",
                    },
                    {
                        icon: "bx bx-shopping-bag",
                        count: totalPayment,
                        title: "Total income",
                        type: "currency",
                    },
                ])

                console.log(statusCard)
                setLoading(false)
            }
            fetch()
        } else {
            async function fetch() {
                const orderResponse = await createAPIEndpoint(
                    ENDPOINTS.ORDERBYDEALERID
                ).fetchById(Number(localStorage.getItem("uid")))

                const stockResponse = await createAPIEndpoint(
                    ENDPOINTS.SALEBYDEALERID
                ).fetchById(Number(localStorage.getItem("uid")))

                let totalStock = 0
                stockResponse.data.forEach((element) => {
                    totalStock += Number(element.quantity)
                })

                setStatusCard([
                    {
                        icon: "bx bx-shopping-bag",
                        count: totalStock,
                        title: "Total Item in Stock",
                        type: "string",
                    },
                    {
                        icon: "bx bx-receipt",
                        count: orderResponse.data.length,
                        title: "Total orders",
                        type: "string",
                    },
                    // {
                    //     icon: "bx bx-shopping-bag",
                    //     count: totalPayment,
                    //     title: "Total income",
                    // },
                ])
                setLoading(false)
            }
            fetch()
        }
    }, [])

    useEffect(() => {
        async function fetch() {
            setLatestOrder(
                await createAPIEndpoint(ENDPOINTS.ORDERDESCENDING).fetchAll()
            )

            setLatestOrderById(
                await createAPIEndpoint(
                    ENDPOINTS.ORDERDESCENDINGBYID
                ).fetchById(Number(localStorage.getItem("uid")))
            )
        }
        fetch()
    }, [])

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(ThemeAction.getTheme)
    // })

    if (loading) return null

    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {statusCard.map((item, index) => (
                            <div className="col-6" key={index}>
                                {/* status card here */}
                                <StatusCard
                                    icon={item.icon}
                                    count={item.count}
                                    title={item.title}
                                    type={item.type}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        {/* chart */}
                        <Chart
                            options={
                                themeReducer === "theme-mode-dark"
                                    ? {
                                          ...chartOptions.options,
                                          theme: { mode: "dark" },
                                      }
                                    : {
                                          ...chartOptions.options,
                                          theme: { mode: "light" },
                                      }
                            }
                            series={chartOptions.series}
                            type="line"
                            height="100%"
                        />
                    </div>
                </div>
                <div className="col-5">
                    <div className="card">
                        <div className="card__header">
                            <h3>top customers</h3>
                        </div>
                        {console.log(dealerOrderDetails)}
                        <div className="card__body">
                            {/* table */}
                            <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) =>
                                    renderCustomerHead(item, index)
                                }
                                bodyData={dealerOrderDetails}
                                renderBody={(item) => renderCustomerBody(item)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to="/">view all</Link>
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="card">
                        <div className="card__header">
                            <h3>latest orders</h3>
                        </div>
                        <div className="card__body">
                            {console.log(latestOrder.data)}
                            {console.log(latestOrderById.data)}
                            {localStorage.getItem("uType") === "staff" ? (
                                <Table
                                    headData={latestOrders.header}
                                    renderHead={(item, index) =>
                                        renderOrderHead(item, index)
                                    }
                                    bodyData={latestOrder.data}
                                    renderBody={(item, index) =>
                                        renderOrderBody(item, index)
                                    }
                                />
                            ) : (
                                <Table
                                    headData={latestOrders.header}
                                    renderHead={(item, index) =>
                                        renderOrderHead(item, index)
                                    }
                                    bodyData={latestOrderById.data}
                                    renderBody={(item, index) =>
                                        renderOrderBody(item, index)
                                    }
                                />
                            )}
                        </div>
                        <div className="card__footer">
                            <Link to="/">view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
