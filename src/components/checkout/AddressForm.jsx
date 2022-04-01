import React from "react"
import { useDispatch } from "react-redux"
import { Button, Grid, Typography, TextField } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
import { Link } from "react-router-dom"
import { SaveShippingAddress } from "../../redux/actions/CartAction"

const AddressForm = ({ next }) => {
    const { control, handleSubmit } = useForm()

    const dispatch = useDispatch()

    const getShippingData = (shippingData) => {
        const { address1, city, country, zip } = shippingData
        dispatch(SaveShippingAddress({ address1, city, country, zip }))
        next()
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>

            <form onSubmit={handleSubmit(getShippingData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Address"
                                    required
                                    fullWidth
                                />
                            )}
                            name="address1"
                            defaultValue=""
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    required
                                    fullWidth
                                />
                            )}
                            name="email"
                            defaultValue=""
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="City"
                                    required
                                    fullWidth
                                />
                            )}
                            name="city"
                            defaultValue=""
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Country"
                                    required
                                    fullWidth
                                />
                            )}
                            name="country"
                            defaultValue=""
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="ZIP / POSTAL CODES"
                                    required
                                    fullWidth
                                />
                            )}
                            name="zip"
                            defaultValue=""
                        />
                    </Grid>
                </Grid>
                <br />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button component={Link} to="/cart" variant="outlined">
                        Back to Cart
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Next
                    </Button>
                </div>
            </form>
        </>
    )
}

export default AddressForm
