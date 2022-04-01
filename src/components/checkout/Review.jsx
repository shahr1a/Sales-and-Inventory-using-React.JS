import React from "react"
import { useSelector } from "react-redux"
import { Typography, List, ListItem, ListItemText } from "@material-ui/core"

const Review = ({ cartItems, subTotal }) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            <List disablePadding>
                {cartItems.map((item) => (
                    <ListItem
                        style={{ padding: "10px 0" }}
                        key={item.productId}
                    >
                        <ListItemText
                            primary={item.name}
                            secondary={`Quantity: ${item.quantity}`}
                        />
                        <Typography variant="body2">
                            $ {item.sellingPrice}
                        </Typography>
                    </ListItem>
                ))}

                <ListItem style={{ padding: "10px 0" }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        $ {subTotal + 80}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default Review