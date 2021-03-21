import Grid from '@material-ui/core/Grid';
import logo from '../assets/logo.svg';
import clientLogo from '../assets/clientLogo.svg'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    clientLogo: {
        height: '2.5rem',
    },
    clientTitle: {
        fontSize: '2rem',
        textAlign: 'left',
        fontWeight: "800",
        color: '#FFFFFF',
    },
    companyLogo: {
        height: '2.5rem'
    },
    invoiceTitle: {
        fontSize: "1.5rem"
    }
})

export default function Navbar() {
    const styles = useStyles();
    return (
        <Grid
            container
            alignContent='flex-start'
            direction='column'
            justify="space-between"
            style={{marginTop:"1.5rem"}}
        >
            <Grid
                container
                alignContent='flex-start'
                direction='row'
                justify="space-between"
                style={{marginBottom:"1rem"}}

            >
                <Grid
                    container
                    alignContent='flex-start'
                    direction='row'
                    justify="flex-start"
                    spacing={3}
                >
                    <Grid
                        item
                    >
                        <img className={styles.clientLogo} src={clientLogo} alt='ABC products logo' />
                    </Grid>
                    <Grid
                        item
                        style={{paddingLeft:'0px'}}
                    >
                        <Typography className={styles.clientTitle}>
                            ABC Products
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        style={{marginLeft:"18em"}}
                    >
                        <img className={styles.companyLogo} src={logo} alt="highradius logo" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                style={{marginBottom:"1rem"}}
            >
                <Typography className={styles.invoiceTitle}>
                    Invoice List
                </Typography>
            </Grid>
        </Grid>
    )
}
