import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, Button, List } from "@mui/material"
import Rating from "@mui/material/Rating"

import Loader from "../components/loader/Loader"
import Message from "../components/message/Message"

import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Icon from "@mui/material/Icon"
import { Row, Col, ListGroup, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import { ListProductDetails } from "../redux/actions/ProductAction"

import "../assets/css/productDetails.css"
import { getImage } from "../api"

function ProductPage({ match, history }) {
    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.ProductDetails)
    const { error, loading, product } = productDetails
    const [imgSrc, setImgSrc] = useState(null)

    useEffect(() => {
        if (product?.image)
            getImage(product.image)
                .then(({ data }) => {
                    console.log(data);
                    const base64ImageString = Buffer.from(data, 'binary').toString('base64')
                    setImgSrc(("data:image/png;base64," + base64ImageString))
                })
                .catch(e => console.log(e.response))
    }, [product])

    useEffect(() => {
        dispatch(ListProductDetails(match.params.id))
    }, [dispatch, match.params.id])

    const [qty, setQty] = useState(1)
    const [selectedIndex, setSelectedIndex] = React.useState(1)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div className="main">
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="filled">{error}</Message>
            ) : (
                <div className="details">
                    <div className="big-img">
                        <img src={imgSrc ?? "/images/inventory/default.PNG"} alt={product.productName} />
                    </div>
                    <div className="box">
                        <div className="row-product">
                            <h2>{product.productName}</h2>
                        </div>
                        <Rating
                            name="half-rating-read"
                            defaultValue={product.rating}
                            precision={0.5}
                            readOnly
                        />
                        {product.numReviews && product.numReviews} Reviews
                        <p>{product.description}</p>
                        {/* <button className="cart">
						<i class="bx bxs-cart-add"></i> Add to Cart
					</button> */}
                    </div>
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                        }}
                    >
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) =>
                                    handleListItemClick(event, 0)
                                }
                            >
                                <ListItemIcon>
                                    <Icon
                                        baseClassName="bx"
                                        className="bxs-dollar-circle"
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Price" />
                                <ListItemText primary=":" />
                                <span>$</span>
                                <ListItemText primary={product.buyingPrice} />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 1}
                                onClick={(event) =>
                                    handleListItemClick(event, 1)
                                }
                            >
                                <ListItemIcon>
                                    <Icon
                                        baseClassName="bx"
                                        className="bxs-check-shield"
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Status" />
                                <ListItemText primary=":" />
                                <ListItemText
                                    primary={
                                        product.stock > 0
                                            ? "In Stock"
                                            : "Out of Stock"
                                    }
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 2}
                                onClick={(event) =>
                                    handleListItemClick(event, 2)
                                }
                            >
                                <ListItemIcon>
                                    <Icon
                                        baseClassName="bx"
                                        className="bxs-add-to-queue"
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Quantity" />
                                <ListItemText primary=":" />
                                <ListItemText>
                                    {product.stock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.stock
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                </ListItemText>
                            </ListItemButton>
                        </List>
                        <Divider />
                        <List
                            component="nav"
                            aria-label="secondary mailbox folder"
                        >
                            <Box pl={2}>
                                <Button
                                    variant="contained"
                                    disabled={product.stock === 0}
                                    onClick={addToCartHandler}
                                >
                                    <i className="bx bxs-cart-add"></i>Add to Cart
                                </Button>
                                <Link to="/Shop" className="link-product">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="medium"
                                    >
                                        Go Back
                                    </Button>
                                </Link>
                            </Box>

                            {/* <ListItemButton
							selected={selectedIndex === 2}
							onClick={(event) => handleListItemClick(event, 2)}
						>
							<ListItemText primary="Trash" />
						</ListItemButton>
						<ListItemButton
							selected={selectedIndex === 3}
							onClick={(event) => handleListItemClick(event, 3)}
						>
							<ListItemText primary="Spam" />
						</ListItemButton> */}
                        </List>
                    </Box>
                </div>
            )}
        </div>
    )
}

export default ProductPage
