import Grid from '@material-ui/core/Grid';
import TableData from '../components/TableData';

export default function OrderDetailView(props) {

    const { 
        responseData, setResponseData, selected, 
        setSelected, searchActive, searchData, searchQuery,
        setSearchQuery, setSearchActive
    } = props

    const clearSearch = () => {
        console.log('Clear');
        setSearchQuery("");
        setSearchActive(false);
      }
    
    return (
        <Grid>
            <TableData
                searchActive={searchActive}
                responseData={searchActive ? searchData : responseData}
                setResponseData={setResponseData}
                selected={selected}
                setSelected={setSelected}
                searchQuery={searchQuery}
                clearSearch={clearSearch}
            />
        </Grid>
    )
}