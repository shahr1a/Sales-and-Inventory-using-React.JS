import { Grid, Typography } from "@material-ui/core"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import InboxIcon from "@mui/icons-material/Inbox"
import DraftsIcon from "@mui/icons-material/Drafts"
import React from "react"
import { useSelector } from "react-redux"

const Confirmation = () => {
    const cart = useSelector((state) => state.Cart)

    return (
        <>
            <div>
                <Typography variant="h5">
                    Thank you for your purchase
                </Typography>
            </div>
        </>
    )
}

export default Confirmation
