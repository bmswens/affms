// Material UI
import { makeStyles } from '@material-ui/core/styles'

// Style
export const useStyles = makeStyles((theme) => ({
    current: {
        color: theme.palette.success.dark
    },
    "due soon": {
        color: theme.palette.warning.dark
    },
    due: {
        color: theme.palette.warning.dark
    },
    overdue: {
        color: theme.palette.error.dark
    },
    card: {
        height: "100%"
    }
}))


export default useStyles