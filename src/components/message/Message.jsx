import React from "react"

import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import AlertTitle from "@mui/material/AlertTitle"

function Message({ variant, children }) {
    return (
        <Stack sx={{ width: "100%" }} spacing={2}>
            {/* <Alert variant={variant} severity="error">
                {children}
            </Alert> */}
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {children} — <strong>check it out!</strong>
            </Alert>
            {/* <Alert variant="outlined" severity="error">
                {children} — check it out!
            </Alert> */}
        </Stack>
    )
}

export default Message
