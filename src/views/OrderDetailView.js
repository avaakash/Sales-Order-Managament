import Grid from '@material-ui/core/Grid';
import TableData from '../components/TableData';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = {

}
export default function OrderDetailView(props) {

    const { 
        responseData, setResponseData, selected, 
        setSelected, searchActive, searchData, searchQuery
    } = props

    return (
        <Grid>
            <TableData
                searchActive={searchActive}
                responseData={searchActive ? searchData : responseData}
                setResponseData={setResponseData}
                selected={selected}
                setSelected={setSelected}
                searchQuery={searchQuery}
            />
        </Grid>
    )
}