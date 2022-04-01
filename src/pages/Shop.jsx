import { Grid, Box } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddToCart } from "../redux/actions/CartAction"
import { ListProducts } from "../redux/actions/ProductAction"
import Loader from "../components/loader/Loader"
import Message from "../components/message/Message"
import Product from "../components/shopProduct/Product"

function Shop() {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.ProductList)
    const { error, loading, products } = productList

    useEffect(() => {
        dispatch(ListProducts())
    }, [dispatch])

    const handleAddToCart = async (productId, qty) => {
        if (productId) {
            dispatch(AddToCart(productId, qty))
        }
    }

    return (
        <main>
            <Box pb={3}>
                <strong>
                    <h1>Latest Product</h1>
                </strong>
            </Box>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="filled">{error}</Message>
            ) : (
                <Grid container justify="center" spacing={4}>
                    {products.map((product) => (
                        <Grid
                            item
                            key={product.productId}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                        >
                            <Product
                                product={product}
                                onAddToCart={handleAddToCart}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </main>
    )
}

export default Shop
