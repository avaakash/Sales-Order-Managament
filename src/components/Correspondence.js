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
import { joinAll, convertToThousands } from '../utils/helpers';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';



export default function CorrespondenceTemplate(props) {

    const { isOpen, handleClose, orders } = props;

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    const title = `View Correspondence (${orders.length})`

    const getSelectedRows = () => {
        const cols = [[
            'Invoice Number', 'PO Number', 'Invoice Date', 'Due Date', 'Currency', 'Open Amount($)'
        ]];
        const rows = 
            orders.map((order) => {
                return [
                    order.salesOrderID,
                    order.salesOrderID,
                    order.salesOrderDate,
                    order.dueDate,
                    order.salesOrderCurrency ? order.salesOrderCurrency : 'USD',
                    convertToThousands(order.openAmount)
                ]
            })
        return {
            cols,
            rows
        }
    }

    const handleDownload = (e) => {
        e.preventDefault();
        const doc = new jsPDF({
            orientation: "landscape",
        });
        
        const {rows, cols} = getSelectedRows();
        doc.text(10, 10, `Invoice Details\n\n
    Dear Sir/Madam,
    Gentle reminder that you have one or more open invoices on your account.
    Please get back to us with an expected date of payment. If you have any specific issue with the
    invoice(s), please let us know so that we can address it at the earliest.\n
    Please find the details of the invoices below:`)
        doc.autoTable({
            head: cols,
            body: rows,
            startY: 65
        });
        let finalY = doc.lastAutoTable.finalY + 10; // The y position on the page
        doc.text(10, finalY, `Total Amount to be paid: \$${getTotal()}\n In case you have already made a payment for the above items, please send us the details to ensure \nthe payment is posted. Let us know if we can be of any further assistance. Looking forward to hearing from you.
    \n\nKind Regards,[First Name][Last Name]`)
        window.open(doc.output('bloburl'), '_blank');
    };

    const getTotal = () => {
        var total = 0;
        orders.map((order) => total += order.openAmount)
        return convertToThousands(total);
    }

    return (
        <Dialog
            open={isOpen}
            handleClose={handleClose}
            maxWidth="lg"
        >
            <Paper className={colorStyles.modalGreen}>
                <DialogTitle className={textStyles.title}>
                    {title}
                </DialogTitle>
                <DialogContent dividers style={{color:'#97A1A9'}}>
                    <DialogContentText className={textStyles.muteText}>
                        <Typography color='inherit'>
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
                                    return (
                                        <TableRow
                                            key={order.salesOrderID}
                                        >
                                            <TableCell>{order.salesOrderID}</TableCell>
                                            <TableCell>{order.salesOrderID}</TableCell>
                                            <TableCell>{order.salesOrderDate}</TableCell>
                                            <TableCell>{order.dueDate}</TableCell>
                                            <TableCell>{order.salesOrderCurrency ? order.salesOrderCurrency : 'USD'}</TableCell>
                                            <TableCell>{convertToThousands(order.openAmount)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        <Typography>
                            Total Amount to be paid: <span style={{color:'white'}}>{`\$${getTotal()}`}</span>
                        </Typography>
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