import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { StyledCheckbox } from './Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SERVER_URL, ROLL_NUMBER } from '../utils/constants';
import { colors, element, text } from '../utils/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { joinAll, getAgeingBucketString } from '../utils/helpers';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

const headCells = [
    { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
    { id: 'customerNumber', numeric: false, disablePadding: false, label: 'Customer #' },
    { id: 'orderNumber', numeric: false, disablePadding: false, label: 'Order #' },
    { id: 'orderAmount', numeric: true, disablePadding: false, label: 'Order Amount' },
    { id: 'dueDate', numeric: false, disablePadding: false, label: 'Due Date' },
    { id: 'predictedPaymentDate', numeric: false, disablePadding: false, label: 'Predicted Payment Date' },
    { id: 'predictedAgingBucket', numeric: false, disablePadding: false, label: 'Predicted Aging Bucket' },
    { id: 'notes', numeric: false, disablePadding: false, label: 'Notes' },

];

function CustomTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props
    const elementStyles = element();
    const textStyles = text();

    return (
        <TableHead>
            <TableRow>
                <TableCell 
                    align="left"
                    padding="checkbox"
                    className={elementStyles.tableCell}
                >
                    <StyledCheckbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all orders' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        className={elementStyles.tableCell}
                    >
                        <Typography className={textStyles.headerCellText}>
                            { headCell.label}
                        </Typography>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default function TableData(props) {
    const colorStyles = colors();
    const textStyles = text();
    const elementStyles = element();

    const URL = `${SERVER_URL}${ROLL_NUMBER}/ListSalesOrder`;

    const { 
        responseData, setResponseData, selected, setSelected, 
        searchActive, searchQuery, clearSearch 
    } = props
    
    const [hasNext, setHasNext] = React.useState(!searchActive);
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
    };

    const fetchDataOnIntialLoad = React.useEffect(() => {
        if (!searchActive) {
            fetchData();
        }
    }, [])

    const highlightSearchedText = (text) => {
        if(searchActive) {
            let newText = text.replace(new RegExp(searchQuery, "gi"), (match) => `<mark>${match}</mark>`);
            return {__html: newText};
        } else {
            return text;
        }
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;
    
    const isPassDueDate = (dueDate) => {
        const now = new Date();
        const convertedDueDate = new Date(dueDate);
        return (now.getTime() > convertedDueDate.getTime());
    }
    return (
        <Container>
            { responseData.length > 0 ? 
                <TableContainer
                    id="tableScrollable"
                    style={{
                        overflowY: 'scroll',
                        maxHeight: "66vh",
                    }}
                >
                    <InfiniteScroll
                        dataLength={responseData.length}
                        next={fetchData}
                        hasMore={hasNext}
                        scrollableTarget="tableScrollable"
                        loader={
                            <div
                                style={{
                                    width:"100px",
                                    height:"100px",
                                    margin:'auto',
                                    padding:'50px'
                                }}>
                                <CircularProgress color="secondary" />
                            </div>
                        }
                    >
                        <Table
                            aria-label="Orders Table"
                            size='small'
                        >
                            <CustomTableHead
                                numSelected={selected.length}
                                rowCount={responseData.length}
                                onSelectAllClick={handleSelectAllClick}
                                
                            />
                            <TableBody>
                                {responseData.map((data, index) => {
                                    const isItemSelected = isSelected(data.salesOrderID);
                                    const orderNumber = highlightSearchedText(data.salesOrderID);
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
                                            classes={{
                                                selected: colorStyles.selected,
                                            }}
                                            className={colorStyles.tableRow}
                                        >
                                            <TableCell 
                                                padding="checkbox"
                                                className={joinAll(elementStyles.tableCell, elementStyles.tableCellRoundedCornerLeft)}
                                            >
                                                <StyledCheckbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell 
                                                scope="row"
                                                className={elementStyles.tableCell}
                                            >
                                                <Typography className={textStyles.tableCellText}>
                                                    {data.customerName}
                                                </Typography>
                                            </TableCell>

                                            <TableCell 
                                                className={elementStyles.tableCell}
                                            >
                                                <Typography className={textStyles.tableCellText}>
                                                    {data.customerNumber}
                                                </Typography>
                                            </TableCell>

                                            <TableCell 
                                                align="right" 
                                                className={elementStyles.tableCell}
                                            >
                                                <Typography className={textStyles.tableCellText}>
                                                    {searchActive ? <p dangerouslySetInnerHTML={orderNumber} /> : orderNumber }
                                                </Typography>
                                            </TableCell>

                                            <TableCell 
                                                align="right" 
                                                className={elementStyles.tableCell}
                                            >
                                                <Typography className={textStyles.tableCellText}>
                                                    {data.salesOrderAmount}
                                                </Typography>
                                            </TableCell>

                                            <TableCell 
                                                align="right"
                                                className={
                                                    isPassDueDate(data.dueDate) ? 
                                                        joinAll(colorStyles.textRed,elementStyles.tableCell) : elementStyles.tableCell
                                                } 
                                            >
                                                <Typography className={textStyles.tableCellText}>
                                                    {data.dueDate}
                                                </Typography>
                                            </TableCell>

                                            <TableCell 
                                                align="right"
                                                className={elementStyles.tableCell}
                                            >
                                                <Typography className={textStyles.tableCellText}>
                                                    {data.predictedPaymentDate ? data.predictedPaymentDate : "--"}
                                                </Typography>
                                            </TableCell>
                                            
                                            <TableCell 
                                                align="right"
                                                className={elementStyles.tableCell}
                                            >
                                                <Typography className={textStyles.tableCellText}>
                                                    {data.predictedAgeingBucket ? 
                                                        getAgeingBucketString(data.predictedAgeingBucket) : "--"}
                                                </Typography>
                                            </TableCell>
                                            
                                            <TableCell 
                                                align="right"
                                                className={joinAll(elementStyles.tableCell, elementStyles.tableCellRoundedCornerRight)}

                                            >
                                                <Typography className={textStyles.tableCellText}>
                                                    { data.notes ? data.notes : '--'}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </InfiniteScroll>
                </TableContainer>
                :
                <Grid>
                    <ErrorOutlineOutlinedIcon />
                    <Typography>
                        No results found
                    </Typography>
                    <Typography>
                        Tru adjusting search to find what you are looking for.
                    </Typography>
                    <Button onClick={clearSearch}>Clear Search</Button>
                </Grid>
                
            }
        </Container>
    );
}
