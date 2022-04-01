import { Add, Remove } from "@mui/icons-material"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AddToCart, RemoveFromCart } from "../redux/actions/CartAction"
import styled from "styled-components"
import { Typography } from "@mui/material"
import { Button as MuiButton } from "@mui/material"
import useStyles from "../components/checkout/styles"
import { getImage } from "../api/index"

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
    font-size: 4rem;
    margin-bottom: 25px;
`
const Top = styled.div`
    display: flex;
    align-item: center;
    justify-content: space-between;
    margin-bottom: 25px;
`
const TopButton1 = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    background: #2980b9;
    color: #fff;
    border-radius: 5px;
`

const TopButton2 = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    background: #2ecc71;
    color: #fff;
    border-radius: 5px;
`
const TopTexts = styled.div``

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 15px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 30px;
    margin: 5px;
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgrey;
    box-shadow: 5px 10px 18px #95a5a6;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``

const CartPage = ({ match, location, history }) => {
    const cart = useSelector((state) => state.Cart)

    const [order, setOrder] = useState({})

    const { cartItems } = cart

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split("=")[1]) : 1

    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) {
            dispatch(AddToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    let subTotal = 0

    for (var i = 0; i < cartItems.length; i++) {
        subTotal +=
            Number(cartItems[i].sellingPrice) * Number(cartItems[i].quantity)
    }

    const handleUpdateCartQty = async (productId, qty) => {
        if (qty < 1 && productId) {
            dispatch(RemoveFromCart(productId, qty))
            return
        }
        if (productId) {
            dispatch(AddToCart(productId, qty))
        }
    }

    const handleRemoveFromCart = async (productId) => {
        if (productId) {
            dispatch(RemoveFromCart(productId))
        }
    }

    const checkOutHandler = async () => {}

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart, start adding some!,{" "}
            <Link to="/shop">start adding some</Link>
        </Typography>
    )

    const classes = useStyles()

    const fetchImage = async (image) => {
        if (!image) return "/images/inventory/default.PNG"
        const { data } = await getImage(image)
        console.log(data)
        const base64ImageString = Buffer.from(data, "binary").toString("base64")
        return "data:image/png;base64," + base64ImageString
    }

    return (
        <Container>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton1>
                        <Link to={`/Shop`} underline="none">
                            CONTINUE SHOPPING
                        </Link>
                    </TopButton1>
                    <TopTexts>
                        <TopText>Shopping Bag ({cartItems.length})</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton2 component={Link} to={`/checkout`} order={order}>
                        <Link to={`/checkout`} underline="none">
                            CHECKOUT NOW
                        </Link>
                    </TopButton2>
                </Top>
                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <Bottom>
                        <Info>
                            {cartItems.map((item) => (
                                <Product key={item.productId}>
                                    <ProductDetail>
                                        <Image src={fetchImage(item.image)} />
                                        <Details>
                                            <ProductName>
                                                <b>Product: </b>
                                                {item.name}
                                            </ProductName>
                                            <ProductId>
                                                <b>ID: </b>
                                                {item.productId}
                                            </ProductId>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <MuiButton
                                                type="button"
                                                size="small"
                                                onClick={() =>
                                                    handleUpdateCartQty(
                                                        item.productId,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                <Add />
                                            </MuiButton>
                                            <ProductAmount>
                                                {item.quantity}
                                            </ProductAmount>
                                            <MuiButton
                                                type="button"
                                                size="small"
                                                onClick={() =>
                                                    handleUpdateCartQty(
                                                        item.productId,
                                                        item.quantity - 1
                                                    )
                                                }
                                            >
                                                <Remove />
                                            </MuiButton>
                                        </ProductAmountContainer>
                                        <ProductPrice>
                                            ${" "}
                                            {item.sellingPrice * item.quantity}
                                        </ProductPrice>
                                        <MuiButton
                                            variant="contained"
                                            type="button"
                                            color="secondary"
                                            onClick={() =>
                                                handleRemoveFromCart(
                                                    item.productId
                                                )
                                            }
                                        >
                                            Remove
                                        </MuiButton>
                                    </PriceDetail>
                                </Product>
                            ))}
                        </Info>
                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>
                                    $ {subTotal}
                                </SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>
                                    Estimated Shipping
                                </SummaryItemText>
                                <SummaryItemPrice>$ 80</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>
                                    Shipping Discount
                                </SummaryItemText>
                                <SummaryItemPrice>$ 0</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>
                                    $ {subTotal + 80}
                                </SummaryItemPrice>
                            </SummaryItem>
                            <MuiButton
                                component={Link}
                                to="/checkout"
                                className={classes.checkoutButton}
                                disabled={cartItems.length === 0}
                                onClick={checkOutHandler}
                                size="large"
                                type="button"
                                variant="contained"
                                color="primary"
                                order={order}
                            >
                                CHECKOUT NOW
                            </MuiButton>
                        </Summary>
                    </Bottom>
                )}
            </Wrapper>
        </Container>
    )
}

export default CartPage
