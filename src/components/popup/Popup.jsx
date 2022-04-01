import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    makeStyles,
    Typography,
    IconButton,
} from "@material-ui/core"
import CloseIcon from "@mui/icons-material/Close"

const useStyles = makeStyles((theme) => ({
    diaplogWrapper: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5),
    },
    dialogTitle: {
        paddingRight: "0px",
    },
}))

export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup } = props
    const classes = useStyles()

    return (
        <Dialog
            open={openPopup}
            maxWidth="md"
            classes={{ paper: classes.diaplogWrapper }}
        >
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: "flex" }}>
                    <Typography
                        variant="h6"
                        component="div"
                        style={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    <IconButton
                        onClick={() => {
                            setOpenPopup(false)
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    )
}
