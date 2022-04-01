import { Box, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import Product from '../components/shopProduct/Product'

const Search = ({ match }) => {
    const [products, setProducts] = useState([])
    const [q, setQ] = useState("")

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.INVENTORYSEARCH).fetchById(q)
            .then(({ data }) => setProducts(data))
            .catch((err) => console.log(err))
    }, [q])

    const searchBarStyles = {
        width: 280,
        marginTop: -108
    }

    return (
        <main>
            <div style={searchBarStyles} className="topnav__search">
                <input value={q} onChange={e => setQ(e.target.value)} type="text" placeholder='Search here...' />
                <i className="bx bx-search"></i>
            </div>
            <Box style={{ marginTop: 70 }} pb={3}>
                <strong>
                    <h1>Search</h1>
                </strong>
            </Box>
            <Grid container justifyContent="center" spacing={4}>
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
                        />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Search
