import React, { useState, useEffect } from "react"

import { createAPIEndpoint, ENDPOINTS } from "../../api"
import TableMui from "../table/TableMui"
//import Notification from "../notification/Notification"

import { TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"

import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone"
export const CategoryList = (props) => {
    const {
        setCategoryId,
        setProductListVisibility,
        resetFormControls,
        setNotify,
    } = props

    const [productList, setProductList] = useState([])
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.CATEGORY)
            .fetchAll()
            .then((res) => {
                setProductList(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const showForUpdate = (id) => {
        setCategoryId(id)
        setProductListVisibility(false)
    }

    const deleteProduct = (id) => {
        if (window.confirm("Are you sure to delete this category?")) {
            createAPIEndpoint(ENDPOINTS.CATEGORYDELETE)
                .delete(id)
                .then((res) => {
                    setProductListVisibility(false)
                    setCategoryId(0)
                    resetFormControls()
                    setNotify({
                        isOpen: true,
                        message: "Category DELETED!",
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
                    <TableCell>Category Title</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {productList.map((item) => (
                    <TableRow key={item.categoryId}>
                        <TableCell
                            onClick={(e) => showForUpdate(item.categoryId)}
                        ></TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.dealerId)}
                        >
                            {item.title}
                        </TableCell>
                        <TableCell
                            onClick={(e) => deleteProduct(item.categoryId)}
                        >
                            <DeleteOutlineTwoToneIcon variant="secondary" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableMui>
    )
}
