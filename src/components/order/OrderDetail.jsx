import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import { createAPIEndpoint, ENDPOINTS } from "../../api"
import { GetSaleOnOrder } from "../../redux/actions/OrderAction"
import TableMui from "../table/TableMui"

import { TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"

import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone"

function OrderDetail({ id }) {
    const dispatch = useDispatch()

    const [orderDetail, setOrderDetail] = useState([])

    // const saleFromOrder = useSelector((state) => state.SalesFromOrder)
    // const { error, loading, salesFromOrder } = saleFromOrder

    useEffect(() => {
        dispatch(GetSaleOnOrder(id))
    }, [dispatch, id])

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.GETSALEONORDER)
            .fetchById(Number(id))
            .then((res) => {
                console.log(res)
                setOrderDetail(res.data)
            })
            .catch((err) => console.log(err))
    }, [id])

    console.log(id)

    return (
        <TableMui>
            <TableHead>
                <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Buying Date</TableCell>
                    <TableCell>Payment Status</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Approval</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {console.log(orderDetail)}
                {orderDetail.map((item) => (
                    <TableRow key={item.saleMasterId}>
                        <TableCell></TableCell>
                        <TableCell>{item.sellingPrice}</TableCell>
                        <TableCell>{item.soldOn}</TableCell>
                        <TableCell>
                            {item.isPaid ? "PAID" : "NOT PAID"}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                            {item.approval ? "APPROVED" : "PENDING"}
                        </TableCell>
                        <TableCell>
                            <DeleteOutlineTwoToneIcon variant="secondary" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableMui>
    )
}

export default OrderDetail
