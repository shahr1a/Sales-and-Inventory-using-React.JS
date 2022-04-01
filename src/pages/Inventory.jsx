import { Grid, Button as MuiButton, ButtonGroup } from "@mui/material"
import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"

import Table from "../components/table/Table"
import { createAPIEndpoint, ENDPOINTS } from "../api"

const inventoryTableHead = [
    "",
    "name",
    "category",
    "description",
    "buying price",
    "in stock",
    "total stock count",
    "",
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.productId}</td>
        <td>{item.productName}</td>
        <td>{item.category.title}</td>
        <td>{item.description}</td>
        <td>{item.buyingPrice}</td>
        <td>{item.inStock}</td>
        <td>{item.stock}</td>
        <td>
            <ButtonGroup>
                <MuiButton
                    LinkComponent={Link}
                    to={`/productAdd/${item.productId}`}
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<EditTwoToneIcon />}
                ></MuiButton>
            </ButtonGroup>
        </td>
    </tr>
)

function Inventory() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await createAPIEndpoint(
                ENDPOINTS.INVENTORY
            ).fetchAll()
            setProducts(data)
        }

        fetchProducts()
    }, [])

    if (localStorage.getItem("uType") !== "staff") return <Redirect to="/" />
    return (
        <Grid>
            <Grid container>
                <Grid item justify="flex-start">
                    <h2 className="page-header">Product List</h2>
                </Grid>
            </Grid>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <Grid container justifyContent="flex-end">
                            <MuiButton variant="contained">
                                <Link to="/productAdd">Add Product</Link>
                            </MuiButton>
                        </Grid>
                        <div className="card__body">
                            <Table
                                limit="10"
                                headData={inventoryTableHead}
                                renderHead={(item, index) =>
                                    renderHead(item, index)
                                }
                                bodyData={products}
                                renderBody={(item, index) =>
                                    renderBody(item, index)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Grid>
    )
}

export default Inventory
