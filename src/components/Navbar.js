import Grid from '@material-ui/core/Grid';
import logo from '../assets/logo.svg';
import clientLogo from '../assets/clientLogo.svg'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    clientLogo: {
        top: '20px',
        left: '30px',
        width: '44px',
        height: '46px',
        background: '#CD7925 0% 0% no-repeat padding-box',
    },
    clientTitle : {
        top: '20px',
        left: '86px',
        fontSize:'39px',
        width: '255px',
        height: '50px',
        textAlign: 'left',
        font: 'normal normal bold 39px/50px Futura PT',
        letterSpacing: '0px',
        color: '#FFFFFF',
    },
    companyLogo: {
        top: '22px',
        left: '843px',
        width: '235px',
        height: '50px'
    }
})

export default function Navbar() {
    const styles = useStyles();
    return (
        <nav>
            <Grid container alignContent='flex-start' direction='row' justify="space-between">
                <Grid container>
                    <img src={clientLogo} alt='ABC products logo' />
                    <Grid item xs={3} className={styles.clientTitle}>ABC Products</Grid>
                    <img src={logo} alt="highradius logo"/>
                </Grid>
            </Grid>
            <Grid>
                <Typography>Invoice List</Typography>
            </Grid>
        </nav>
    )
}
