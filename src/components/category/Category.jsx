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
import Notification from "../notification/Notification"

import { Input, Button } from "../controls"
import { useForm } from "../hooks/useForm"
import { createAPIEndpoint, ENDPOINTS } from "../../api"

import ReplayIcon from "@mui/icons-material/Replay"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import ReorderIcon from "@mui/icons-material/Reorder"
import { CategoryList } from "./CategoryList"

const getFreshModelObject = () => ({
    categoryId: 0,
    title: ""
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

const Category = ({ match }) => {
    const {
        values,
        setValues,
        setErrors,
        handleInputChange,
        resetFormControls,
    } = useForm(getFreshModelObject)
    const classes = useStyles()

    const [productListVisibility, setProductListVisibility] = useState(false)
    const [categoryId, setCategoryId] = useState(0)
    const [notify, setNotify] = useState({ isOpen: false })

    useEffect(() => {
        match.params?.id && setCategoryId(match.params.id)
    }, [match.params.id])

    const validateForm = () => {
        let temp = {}
        temp.title =
            values.title !== "" ? "" : "This field is required!"
        setErrors({ ...temp })
        return Object.values(temp).every((x) => x === "")
    }

    useEffect(() => {
        if (categoryId === 0) resetFormControls()
        else {
            createAPIEndpoint(ENDPOINTS.CATEGORYBYID)
                .fetchById(categoryId)
                .then((res) => {
                    setValues(res.data)
                    setErrors({})
                })
                .catch((err) => console.log(err))
        }
        // eslint-disable-next-line
    }, [categoryId])

    const resetForm = () => {
        resetFormControls()
        setCategoryId(0)
    }

    const submitProduct = (e) => {
        e.preventDefault()
        if (validateForm()) {
            if (values.categoryId === 0) {
                createAPIEndpoint(ENDPOINTS.CATEGORYPOST)
                    .create(values)
                    .then((res) => {
                        resetFormControls()
                        setNotify({
                            isOpen: true,
                            message: "New Category Info Added.",
                        })
                    })
                    .catch((err) => console.log(err))
            } else {
                createAPIEndpoint(ENDPOINTS.CATEGORYPUT)
                    .update(categoryId, values)
                    .then((res) => {
                        setCategoryId(0)
                        setNotify({
                            isOpen: true,
                            message: "Category Details Updated.",
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
                            label="Category Id"
                            name="categoryId"
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
                            value={values.categoryId}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Input
                            label="Title"
                            name="title"
                            value={values.title}
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
                            Category List
                        </Button>
                    </Grid>
                </Grid>
            </Form>

            <Popup
                title="List of categories"
                openPopup={productListVisibility}
                setOpenPopup={setProductListVisibility}
            >
                <CategoryList
                    {...{
                        setCategoryId,
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

export default Category
