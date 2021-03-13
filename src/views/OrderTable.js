import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SERVER_URL, ROLL_NUMBER } from '../utils/constants';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function OrderTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all orders' }}
                    /> 
                </TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell align="right">Customer #</TableCell>
                <TableCell align="right">Order #</TableCell>
                <TableCell align="right">Order Amount</TableCell>
                <TableCell align="right">Due Date</TableCell>
                <TableCell align="right">Predicted Payment Date</TableCell>
                <TableCell align="right">Predicted Aging Bucket</TableCell>
                <TableCell align="right">Notes</TableCell>
            </TableRow>
        </TableHead>
    )
}

export default function OrderTable(props) {
    const classes = useStyles();

    const URL = `${SERVER_URL}${ROLL_NUMBER}/ListSalesOrder`;

    const {responseData, setResponseData, selected, setSelected} = props
    const [hasNext, setHasNext] = React.useState(false);
    const [pageNumber, setPageNumber] = React.useState(0);

    const fetchData = () => {
        setPageNumber(pageNumber + 1);
        axios
            .get(`${URL}?page=${pageNumber}&count=30`)
            .then((res) => {
                setResponseData([...responseData, ...res.data]);
                setHasNext(true);
            })
            .catch((error) => {
                setHasNext(false);
                console.log(error);
            });
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = responseData.map((n) => n.salesOrderID);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        console.log(newSelected);
    };

    const fetchDataOnIntialLoad = React.useEffect(() => {
        fetchData();
    }, [])

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Orders Table" stickyHeader>
                    <OrderTableHead
                        numSelected={selected.length}
                        rowCount={responseData.length}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                        <InfiniteScroll
                            dataLength={responseData.length}
                            next={fetchData}
                            hasMore={hasNext}
                            loader={<p>Loading....</p>}
                        >
                            {responseData.map((data, index) => {
                                const isItemSelected = isSelected(data.salesOrderID);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        key={data.salesOrderID}
                                        hover
                                        onClick={(event) => handleClick(event, data.salesOrderID)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell scope="row">
                                            {data.customerName}
                                        </TableCell>
                                        <TableCell>{data.customerNumber}</TableCell>
                                        <TableCell align="right">{data.saleOrderID}</TableCell>
                                        <TableCell align="right">{data.saleOrderAmount}</TableCell>
                                        <TableCell align="right">{data.dueDate}</TableCell>
                                        <TableCell align="right">{data.predictedPaymentDate}</TableCell>
                                        <TableCell align="right">{data.predictedAgingBucket}</TableCell>
                                        <TableCell align="right">{data.notes}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </InfiniteScroll>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}