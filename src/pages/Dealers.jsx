import React, { useState, useEffect } from "react"
import Table from "../components/table/Table"
import { createAPIEndpoint, ENDPOINTS } from "../api"
import { Grid, Button as MuiButton } from "@mui/material"
import { Link, Redirect } from "react-router-dom"
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"
import { ButtonGroup } from "@material-ui/core"

const customerTableHead = [
    "",
    "Full name",
    "Username",
    "Location",
    "Verified",
    "",
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.dealerId}</td>
        <td>{item.dealerName}</td>
        <td>{item.dealerUsername}</td>
        <td>{item.dealerLocation}</td>
        <td>{item.isVerified.toString()}</td>
        <td>
            <ButtonGroup>
                <MuiButton
                    LinkComponent={Link}
                    to={`/dealerAdd/${item.dealerId}`}
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<EditTwoToneIcon />}
                ></MuiButton>
            </ButtonGroup>
        </td>
    </tr>
)

const Dealers = () => {
    const [dealers, setDealers] = useState([])

    useEffect(() => {
        async function fetchDealers() {
            const { data } = await createAPIEndpoint(
                ENDPOINTS.DEALER
            ).fetchAll()
            setDealers(data)
        }
        fetchDealers()
    }, [])

    if (localStorage.getItem("uType") !== "staff") return <Redirect to="/" />

    return (
        <div>
            <h2 className="page-header">Dealers</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <Grid container justifyContent="flex-end">
                            <MuiButton variant="contained">
                                <Link to="/dealerAdd">Add Dealer</Link>
                            </MuiButton>
                        </Grid>
                        <div className="card__body">
                            <Table
                                limit="10"
                                headData={customerTableHead}
                                renderHead={(item, index) =>
                                    renderHead(item, index)
                                }
                                bodyData={dealers}
                                renderBody={(item, index) =>
                                    renderBody(item, index)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dealers
