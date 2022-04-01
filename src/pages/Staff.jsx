import { Grid, Button as MuiButton } from "@mui/material"
import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"

import Table from "../components/table/Table"
import { createAPIEndpoint, ENDPOINTS } from "../api"
import { useSelector } from "react-redux"

const inventoryTableHead = [
    "",
    "username",
    "first name",
    "last name",
    "contact no",
    "admin privilege",
    "",
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.userId}</td>
        <td>{item.userName}</td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.contactNo}</td>
        <td>{item.isAdmin.toString()}</td>
    </tr>
)

const Staff = () => {
    const [staff, setStaff] = useState([])
    const { user } = useSelector((state) => state.AuthReducer)

    useEffect(() => {
        async function fetchStaff() {
            const { data } = await createAPIEndpoint(ENDPOINTS.USER).fetchAll()
            setStaff(data)
        }

        fetchStaff()
    }, [])

    if (localStorage.getItem("uType") !== "staff") return <Redirect to="/" />

    return (
        <Grid>
            <Grid container>
                <Grid item justify="flex-start">
                    <h2 className="page-header">Staff List</h2>
                </Grid>
            </Grid>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        {user?.isAdmin && (
                            <Grid container justifyContent="flex-end">
                                <MuiButton variant="contained">
                                    <Link to="/staffAdd">Add Staff</Link>
                                </MuiButton>
                            </Grid>
                        )}
                        <div className="card__body">
                            <Table
                                limit="10"
                                headData={inventoryTableHead}
                                renderHead={(item, index) =>
                                    renderHead(item, index)
                                }
                                bodyData={staff}
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

export default Staff
