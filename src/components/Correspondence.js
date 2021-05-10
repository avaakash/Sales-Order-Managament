import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { colors, text, element } from '../utils/styles';
import { joinAll, convertToThousands } from '../utils/helpers';
import { jsPDF } from 'jspdf';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import CloseSVG from '../assets/baseline-close-24px.svg'
import { Templates } from '../utils/correspondenceTemplates';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from '@material-ui/core';
import autoTable from 'jspdf-autotable';

export default function CorrespondenceTemplate(props) {

    const { isOpen, handleClose, orders } = props;

    const [template, setTemplate] = React.useState(0);

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    const handleChange = (e) => {
        console.log(template)
        setTemplate(e.target.value)
    }

    const getTotal = () => {
        var total = 0;
        orders.map((order) => total += order.openAmount)
        return convertToThousands(total);
    }

    const title = `View Correspondence (${orders.length})`

    const DerivedTemplates = Templates(orders, textStyles, elementStyles, colorStyles, getTotal);

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

        const { rows, cols } = getSelectedRows();
        doc.text(10, 10, `Invoice Details\n\n
    Dear Sir/Madam,
    This is to remind you that there are one or more open invoices on your account. Please provide at your 
    earliest convenience an update on the payment details or clarify the reason for the delay. If you have any 
    specific issue with the invoice(s), please let us know so that we can address it to the correct Department.\n
    Please find the details of the invoices below:`)
        doc.autoTable({
            head: cols,
            body: rows,
            startY: 65
        });
        let finalY = doc.lastAutoTable.finalY + 10; // The y position on the page
        doc.text(10, finalY, `Total Amount to be paid: $${getTotal()}\n\n In case you have already made a payment for the above items, please send us the details to ensure \nthe payment is posted. Let us know if we can be of any further assistance. Looking forward to hearing from you.
    \n\nKind Regards,
    [First Name][Last Name]`)
        window.open(doc.output('bloburl'), '_blank');
    };

    return (
        <Dialog
            open={isOpen}
            handleClose={handleClose}
            maxWidth="lg"
            scroll='paper'
            PaperProps={{
                classes: {
                    root: colorStyles.modalGreen
                }
            }}
        >
            <DialogTitle className={textStyles.title}>
                <Grid
                    container
                    justify='flex-start'
                    alignItems='center'
                >
                    <Grid item>
                        {title}
                    </Grid>
                    <Grid
                        item
                        style={{ marginLeft: '55%' }}
                    >
                        <InputLabel className={textStyles.smallWhite}>View: </InputLabel>
                    </Grid>
                    <Grid
                        item
                        style={{ marginLeft: '0.5rem' }}
                    >
                        <FormControl variant='outlined' className={elementStyles.dropdown}>
                            <Select
                                labelId='view'
                                value={template}
                                onChange={handleChange}
                            >
                                {
                                    DerivedTemplates.map((t, index) => {
                                        return (
                                            <MenuItem value={index} className={textStyles.headerCellText}>
                                                {`Template ${index + 1}`}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid
                        item
                        style={{ marginLeft: '3rem' }}
                    >
                        <img
                            alt='Close Icon'
                            src={CloseSVG}
                            onClick={handleClose}
                            className={elementStyles.closeIcon}
                        />
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers style={{ overflowY: "scroll" }}>
                <DialogContentText>
                    {DerivedTemplates[template]}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid
                    container
                    justify='flex-end'
                    alignItems='baseline'
                    direction='row'
                    spacing={1}
                >
                    <Grid item>
                        <Button
                            type="button"
                            id="cancel"
                            onClick={handleClose}
                        >
                            <Typography className={joinAll(textStyles.buttonText, colorStyles.textBlue)}>
                                Cancel
                        </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
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
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}