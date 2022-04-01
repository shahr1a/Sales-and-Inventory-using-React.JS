import React, { useEffect } from "react"
import Rating from "@mui/material/Rating"
import { Link } from "react-router-dom"
import { useState } from "react"

import useStyles from "./styles"

import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    IconButton,
} from "@mui/material"
import { AddShoppingCart } from "@mui/icons-material"
import { getImage } from "../../api"

export default function Product({ product, onAddToCart }) {
    const classes = useStyles()
    const [imgSrc, setImgSrc] = useState(null)

    useEffect(() => {
        if (product?.image)
            getImage(product.image)
                .then(({ data }) => {
                    const base64ImageString = Buffer.from(
                        data,
                        "binary"
                    ).toString("base64")
                    setImgSrc("data:image/png;base64," + base64ImageString)
                })
                .catch((e) => console.log(e.response))
    }, [product])

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={imgSrc ?? "/images/inventory/default.PNG"}
                title={product.productName}
            />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.productName}
                    </Typography>
                    <Typography variant="h5">${product.buyingPrice}</Typography>
                </div>
                <Typography color="text.secondary" variant="body3">
                    {product.category?.title}{" "}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {product.description}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                    <Rating
                        name="half-rating-read"
                        defaultValue={product.rating}
                        precision={0.5}
                        readOnly
                    />
                </Typography>
                <Typography color="text.secondary" style={{ color: "black" }}>
                    {product.numReviews && product.numReviews} Reviews
                </Typography>
                <Typography color="text.secondary">
                    <strong>Status: </strong>{" "}
                    {product.inStock ? "Available" : "Currently OUT OF STOCK"}{" "}
                </Typography>{" "}
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <Link
                    to={`/productDetails/${product.productId}`}
                    underline="none"
                    pl={2}
                >
                    <Button
                        className={classes.cardButton}
                        variant="contained"
                        size="large"
                    >
                        Details
                    </Button>
                </Link>
                <IconButton
                    aria-label="Add to Cart"
                    onClick={() => onAddToCart(product.productId, 1)}
                >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}
