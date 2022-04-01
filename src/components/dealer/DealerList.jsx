import React, { useState, useEffect } from "react"

import { createAPIEndpoint, ENDPOINTS } from "../../api"
import TableMui from "../table/TableMui"
//import Notification from "../notification/Notification"

import { TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"

import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone"

function DealerList(props) {
    const {
        setDealerId,
        setDealerListVisibility,
        resetFormControls,
        setNotify,
    } = props

    const [dealerList, setDealerList] = useState([])
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.DEALER)
            .fetchAll()
            .then((res) => {
                setDealerList(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const showForUpdate = (id) => {
        setDealerId(id)
        setDealerListVisibility(false)
    }

    const deleteProduct = (id) => {
        if (window.confirm("Are you sure to delete this dealer info?")) {
            createAPIEndpoint(ENDPOINTS.DEALERDELETE)
                .delete(id)
                .then((res) => {
                    setDealerListVisibility(false)
                    setDealerId(0)
                    resetFormControls()
                    setNotify({
                        isOpen: true,
                        message: "Dealer DELETED!",
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
                    <TableCell>Dealer Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Verified</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dealerList.map((item) => (
                    <TableRow key={item.dealerId}>
                        <TableCell
                            onClick={(e) => showForUpdate(item.dealerId)}
                        ></TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.dealerId)}
                        >
                            {item.dealerName}
                        </TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.dealerId)}
                        >
                            {item.dealerUsername}
                        </TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.dealerId)}
                        >
                            {item.dealerLocation}
                        </TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.dealerId)}
                        >
                            {item.isVerified.toString()}
                        </TableCell>
                        <TableCell
                            onClick={(e) => showForUpdate(item.dealerId)}
                        >
                            {item.dealerDiscount}
                        </TableCell>
                        <TableCell
                            onClick={(e) => deleteProduct(item.dealerId)}
                        >
                            <DeleteOutlineTwoToneIcon variant="secondary" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableMui>
    )
}

export default DealerList
