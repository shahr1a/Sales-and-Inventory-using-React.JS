import React from "react"
import LinearProgress from "@mui/material/LinearProgress"

function Loader() {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0
                }
                const diff = Math.random() * 10
                return Math.min(oldProgress + diff, 100)
            })
        }, 500)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <LinearProgress
            variant="determinate"
            color="inherit"
            style={{
                height: "5px",
                width: "150px",
                margin: "auto",
                display: "block",
            }}
            value={progress}
        >
            <span className="sr-only">Loading...</span>
        </LinearProgress>
    )
}

export default Loader
