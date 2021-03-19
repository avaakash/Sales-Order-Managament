import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { colors, text, element } from '../utils/styles';
import { TableBody, Typography, Button, ButtonGroup, Paper } from '@material-ui/core';
import { joinAll, converToThousands } from '../utils/helpers';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';



export default function CorrespondenceTemplate(props) {

    const { isOpen, handleClose, orders } = props;

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    const title = `View Correspondence (${orders.length})`

    const getSelectedRows = () => {
        const cols = ['Invoice Number', 'PO Number', 'Invoice Date', 'Due Date', 'Currency', 'Open Amount($)'];
        const rows = [orders]
            // orders.map((order) => {
            //     return [
            //         order.salesOrderID,
            //         order.salesOrderID,
            //         order.salesOrderDate,
            //         order.dueDate,
            //         order.salesOrderCurrency,
            //         converToThousands(order.openAmount)
            //     ]
            // })
        // ]
        console.log(rows);
        return {
            cols,
            rows
        }
    }

    const handleDownload = (e) => {
        e.preventDefault();
        const doc = new jsPDF();
        const {rows, cols} = getSelectedRows();
        autoTable(doc, {
            columns: cols,
            body: rows
        });
        window.open(doc.output('bloburl'), '_blank');
    };

    const getTotal = () => {
        let total = 0;
        orders.map((order) => total += order.openAmount)
        return converToThousands(total);
    }

    return (
        <Dialog
            open={isOpen}
            handleClose={handleClose}
            style={{maxWidth: '90%'}}
        >
            <Paper className={colorStyles.modalGreen}>
                <DialogTitle className={textStyles.title}>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={textStyles.muteText}>
                        <Typography>
                            Subject: <span style={{color:'white'}}> Order Details - (Account Name)</span>
                        </Typography>
                        <Typography>
                            Dear Sir/Madam,
                    </Typography>
                        <Typography>
                            Gentle reminder that you have one or more open invoices on your account. <br />
                        Please get back to us with an expected date of payment. If you have any specific issue with the
                        invoice(s), please let us know so that we can address it at the earliest. <br />
                        Please find the details of the invoices below:
                    </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Invoice Number</TableCell>
                                    <TableCell>PO Number</TableCell>
                                    <TableCell>Invoice Date</TableCell>
                                    <TableCell>Due Date</TableCell>
                                    <TableCell>Currency</TableCell>
                                    <TableCell>Open Amount($)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order, index) => {
                                    console.log(order.salesOrderID, index);
                                    return (
                                        <TableRow
                                            key={order.salesOrderID}
                                        >
                                            <TableCell>{order.salesOrderID}</TableCell>
                                            <TableCell>{order.salesOrderID}</TableCell>
                                            <TableCell>{order.salesOrderDate}</TableCell>
                                            <TableCell>{order.dueDate}</TableCell>
                                            <TableCell>{order.salesOrderCurrency ? order.salesOrderCurrency : 'USD'}</TableCell>
                                            <TableCell>{converToThousands(order.openAmount)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        <Typography>
                            In case you have already made a payment for the above items, please send us the details
                        to ensure the paymeny is posted <br />
                        Let us know if we can be of any further assistance. Looking forward to hearing from you.
                    </Typography>
                        <Typography>
                            Kind Regards,
                        <span>[First Name][Last Name]</span>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button
                            type="button"
                            id="cancel"
                            onClick={handleClose}
                        >
                            <Typography className={joinAll(textStyles.buttonText, colorStyles.textBlue)}>
                                Cancel
                        </Typography>
                        </Button>
                        <Button
                            type="button"
                            className={joinAll(colorStyles.buttonActiveFilled, elementStyles.button)}
                            id="download"
                            onClick={handleDownload}
                        >
                            <Typography className={textStyles.buttonText}>
                                Download
                </Typography>
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Paper>
        </Dialog>
    )
}