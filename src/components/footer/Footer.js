import React from 'react'

import { Grid } from '@material-ui/core'

function Footer() {
    return (
        <footer>
            <Grid 
             container
             spacing={0}
             direction="column"
             alignItems="center"
             justifyContent="center"
             style={{minHeight: '100vh'}}>
                 <Grid sx={{ pb: 3}}>
                    Copyright &copy; SalesInventory
                 </Grid>                
            </Grid> 
        </footer>
    )
}

export default Footer
