import React, { useState, useEffect } from "react"

import { createAPIEndpoint, ENDPOINTS } from "../../api"
import TableMui from "../table/TableMui"
//import Notification from "../notification/Notification"

import { TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"

import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone"
//import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"

function ProductList(props) {
    const {
        setProductId,
        setProductListVisibility,
        resetFormControls,
        setNotify,
    } = props

    const [productList, setProductList] = useState([])
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.INVENTORY)
            .fetchAll()
            .then((res) => {
                setProductList(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const showForUpdate = (id) => {
        setProductId(id)
        setProductListVisibility(false)
    }

    const deleteProduct = (id) => {
        if (window.confirm("Are you sure to delete this record?")) {
            createAPIEndpoint(ENDPOINTS.INVENTORYDELETE)
                .delete(id)
                .then((res) => {
                    setProductListVisibility(false)
                    setProductId(0)
                    resetFormControls()
                    setNotify({
                        isOpen: true,
                        message: "Product DELETED!",
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <TableMui>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Buying Price</TableCell>
                    <TableCell>Stock Count</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {productList.map((item) => (
                    <TableRow key={item.productId}>
                        <TableCell
                            onClick={(e) => showForUpdate(item.productId)}
                        ></TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.productId)}
                        >
                            {item.productName}
                        </TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.productId)}
                        >
                            {item.description}
                        </TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.productId)}
                        >
                            {item.buyingPrice}
                        </TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.productId)}
                        >
                            {item.stock}
                        </TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.productId)}
                        >
                            {item.category.title}
                        </TableCell>
                        <TableCell
                            onClick={(e) => deleteProduct(item.productId)}
                        >
                            <DeleteOutlineTwoToneIcon variant="secondary" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableMui>
    )
}

export default ProductList
