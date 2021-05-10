import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { StyledCheckbox } from './Checkbox';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SERVER_URL, ROLL_NUMBER } from '../utils/constants';
import { colors, element, text } from '../utils/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { joinAll, getAgeingBucketString } from '../utils/helpers';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CustomCheckbox from '../assets/Rectangle_1096.svg';
import { Icon } from '@material-ui/core';


const headCells = [
    { id: 'customerName', disablePadding: true, align:false, label: 'Customer Name' },
    { id: 'customerNumber', disablePadding: false, align:false, label: 'Customer #' },
    { id: 'orderNumber', disablePadding: false, align:false, label: 'Order #' },
    { id: 'orderAmount', disablePadding: false, align:true, label: 'Order Amount' },
    { id: 'dueDate', disablePadding: false, align:true, label: 'Due Date' },
    { id: 'predictedPaymentDate', disablePadding: true, align:false, label: 'Predicted Payment Date' },
    { id: 'predictedAgingBucket', disablePadding: false, align:false, label: 'Predicted Aging Bucket' },
    { id: 'notes', disablePadding: false, align:false, label: 'Notes' },

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
                        icon={
                            <Icon>
                                <img alt='checkbox' className={elementStyles.imageIcon} src={CustomCheckbox} />
                            </Icon>
                            }
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align ? 'right': 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        className={elementStyles.tableCell}
                    >
                        <Typography className={textStyles.headerCellText}>
                            {headCell.label}
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
        searchActive, searchQuery
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

    React.useEffect(() => {
        if (!searchActive) {
            fetchData();
        }
    }, [])

    const highlightSearchedText = (text) => {
        if (searchActive) {
            let newText = text.replace(new RegExp(searchQuery, "gi"), (match) => `<mark>${match}</mark>`);
            return { __html: newText };
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
        <Container
            maxWidth="100%"
        >
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
                                    width: "100px",
                                    height: "100px",
                                    margin: 'auto',
                                    padding: '50px'
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
                                            className={joinAll(colorStyles.tableRow, elementStyles.tableRow)}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                className={joinAll(elementStyles.tableCell, elementStyles.tableCellRoundedCornerLeft)}
                                                align='center'
                                            >
                                                <StyledCheckbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    icon={
                                                    <Icon>
                                                        <img alt='checkbox' className={elementStyles.imageIcon} src={CustomCheckbox} />
                                                    </Icon>
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell
                                                scope="row"
                                                className={elementStyles.tableCell}
                                                align='left'
                                            >
                                                <Typography className={textStyles.tableCellText} variant='inherit'>
                                                    {data.customerName}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                className={elementStyles.tableCell}
                                                align='left'
                                            >
                                                <Typography className={textStyles.tableCellText} variant='inherit'>
                                                    {data.customerNumber}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                align="left"
                                                className={elementStyles.tableCell}
                                            >
                                                <Typography className={textStyles.tableCellText} variant='inherit'>
                                                    {searchActive ? <p dangerouslySetInnerHTML={orderNumber} /> : orderNumber}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                align="right"
                                                className={elementStyles.tableCell}
                                            >
                                                <Typography className={textStyles.tableCellText} variant='inherit'>
                                                    {data.salesOrderAmount}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                align="right"
                                                className={
                                                    isPassDueDate(data.dueDate) ?
                                                        joinAll(colorStyles.textRed, elementStyles.tableCell) : elementStyles.tableCell
                                                }
                                            >
                                                <Typography className={textStyles.tableCellText} variant='inherit'>
                                                    {data.dueDate}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                align="right"
                                                className={elementStyles.tableCell}
                                            >
                                                <Typography className={textStyles.tableCellText} variant='inherit'>
                                                    {data.predictedPaymentDate ? data.predictedPaymentDate : "--"}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                align="left"
                                                className={elementStyles.tableCell}
                                            >
                                                <Typography className={textStyles.tableCellText} variant='inherit'>
                                                    {data.predictedAgeingBucket ?
                                                        getAgeingBucketString(data.predictedAgeingBucket) : "--"}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                align="left"
                                                className={joinAll(elementStyles.tableCell, elementStyles.tableCellRoundedCornerRight)}

                                            >
                                                <Typography className={textStyles.tableCellText} variant='inherit'>
                                                    {data.notes ? data.notes : '--'}
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
                <Container
                    maxWidth='lg'
                >
                    <Grid
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                        style={{
                            marginTop:'15%',
                            marginBottom:'15%',
                        }}
                    >
                        <Grid item>
                            <ErrorOutlineOutlinedIcon
                                style={{color:'red'}}
                            />
                        </Grid>
                        <Grid item>
                            <Typography>
                                No results found
                    </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                style={{
                                    color:'#C0C6CA',
                                    fontSize: '0.8rem',
                                    marginBottom:'1rem'
                                }}
                            >
                                Try adjusting search to find what you are looking for.
                    </Typography>
                        </Grid>
                        <Grid item>
                            <Button 
                                style={{color:'#14AFF1'}}
                            >
                                Clear Search
                            </Button>
                        </Grid>
                    </Grid>
                </Container>

            }
        </Container>
    );
}
