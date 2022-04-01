import {
    Grid,
    InputAdornment,
    makeStyles,
    ButtonGroup,
    Button as MuiButton,
} from "@material-ui/core"
import React, { useState, useEffect } from "react"
import Form from "../form/Form"
import Popup from "../popup/Popup"
import ProductList from "./ProductList"
import Notification from "../notification/Notification"

import { Input, Select, Button } from "../controls"
import { useForm } from "../hooks/useForm"
import { createAPIEndpoint, ENDPOINTS, uploadImage } from "../../api"

import ReplayIcon from "@mui/icons-material/Replay"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import ReorderIcon from "@mui/icons-material/Reorder"

const getFreshModelObject = () => ({
    productId: 0,
    productName: "",
    description: "",
    buyingPrice: 0,
    inStock: true,
    stock: 0,
    categoryId: 0,
    deletedProductIds: "",
})

const useStyles = makeStyles((theme) => ({
    adornmentText: {
        "& .MuiTypography-root": {
            color: "#f3b33d",
            fontWeight: "bolder",
            fontSize: "1.5em",
        },
    },
    submitButtonGroup: {
        backgroundColor: "#f3b33d",
        color: "#000",
        margin: theme.spacing(1),
        "& .MuiButton-label": {
            textTransform: "none",
        },
        "&:hover": {
            backgroundColor: "#f3b33d",
        },
    },
}))

export default function ProductForm({ match }) {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls,
    } = useForm(getFreshModelObject)
    const classes = useStyles()

    const [categoryList, setCategoryList] = useState([])
    const [productListVisibility, setProductListVisibility] = useState(false)
    const [productId, setProductId] = useState(0)
    const [notify, setNotify] = useState({ isOpen: false })
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.CATEGORY)
            .fetchAll()
            .then((res) => {
                let categoryList = res.data.map((item) => ({
                    id: item.categoryId,
                    title: item.title,
                }))
                categoryList = [
                    { id: 0, title: "--SELECT CATEGORY--" },
                ].concat(categoryList)
                setCategoryList(categoryList)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        match.params?.id && setProductId(match.params.id)
    }, [match.params.id])

    const validateForm = () => {
        let temp = {}
        temp.categoryId =
            values.categoryId !== 0 ? "" : "This field is required!"
        temp.productName =
            values.productName !== "" ? "" : "Product Name is required!"
        temp.buyingPrice =
            values.buyingPrice !== 0 ? "" : "Base price is required!"

        setErrors({ ...temp })
        return Object.values(temp).every((x) => x === "")
    }

    useEffect(() => {
        setValues({
            ...values,
        })
        // eslint-disable-next-line
    }, [JSON.stringify(values)])

    useEffect(() => {
        if (productId === 0) resetFormControls()
        else {
            createAPIEndpoint(ENDPOINTS.INVENTORYBYID)
                .fetchById(productId)
                .then((res) => {
                    setValues(res.data)
                    setErrors({})
                })
                .catch((err) => console.log(err))
        }
        // eslint-disable-next-line
    }, [productId])

    const resetForm = () => {
        resetFormControls()
        setProductId(0)
    }

    const submitProduct = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            let formdata = values
            if (selectedFile) {
                const mediaForm = new FormData();
                mediaForm.append("file", selectedFile)
                let { data } = await uploadImage(mediaForm).catch(e => console.log(e.response))
                console.log(data);
                formdata["image"] = data
            }
            if (values.productId === 0) {
                createAPIEndpoint(ENDPOINTS.INVENTORYPOST)
                    .create(formdata)
                    .then(() => {
                        resetFormControls()
                        setNotify({
                            isOpen: true,
                            message: "New Product Added to Inventory.",
                        })
                    })
                    .catch((err) => console.log(err.response))
            } else {
                createAPIEndpoint(ENDPOINTS.INVENTORYPUT)
                    .update(productId, formdata)
                    .then((res) => {
                        setProductId(0)
                        setNotify({
                            isOpen: true,
                            message: "Products Details Updated.",
                        })
                    })
                    .catch((err) => console.log(err))
            }
        }
    }

    const openListOfProducts = () => {
        setProductListVisibility(true)
    }

    return (
        <div>
            <Form onSubmit={submitProduct}>
                <Grid container>
                    <Grid item xs={6}>
                        <Input
                            disabled
                            label="Product Id"
                            name="productId"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        className={classes.adornmentText}
                                        position="start"
                                    >
                                        #
                                    </InputAdornment>
                                ),
                            }}
                            value={values.productId}
                        />

                        <Input
                            label="Product Name"
                            name="productName"
                            value={values.productName}
                            onChange={handleInputChange}
                            error={errors.productName}
                        />
                        <Input
                            label="Description"
                            name="description"
                            value={values.description}
                            onChange={handleInputChange}
                        />
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                hidden
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            label="Category"
                            name="categoryId"
                            onChange={handleInputChange}
                            options={categoryList}
                            value={values.categoryId}
                            error={errors.category}
                        />
                        <Input
                            label="Base Price"
                            name="buyingPrice"
                            value={values.buyingPrice}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        className={classes.adornmentText}
                                        position="start"
                                    >
                                        $
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleInputChange}
                            error={errors.buyingPrice}
                        />
                        <Input
                            type="number"
                            label="Stock"
                            name="stock"
                            value={values.stock}
                            onChange={handleInputChange}
                        />

                        <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton
                                size="large"
                                type="submit"
                                endIcon={<Inventory2Icon />}
                            >
                                Submit
                            </MuiButton>
                            <MuiButton
                                size="small"
                                startIcon={<ReplayIcon />}
                                onClick={resetForm}
                            />
                        </ButtonGroup>
                        <Button
                            size="large"
                            onClick={openListOfProducts}
                            startIcon={<ReorderIcon />}
                        >
                            Products
                        </Button>
                    </Grid>
                </Grid>
            </Form>

            <Popup
                title="List of Products"
                openPopup={productListVisibility}
                setOpenPopup={setProductListVisibility}
            >
                <ProductList
                    {...{
                        setProductId,
                        setProductListVisibility,
                        resetFormControls,
                        setNotify,
                    }}
                />
            </Popup>

            <Notification {...{ notify, setNotify }} />
        </div>
    )
}
