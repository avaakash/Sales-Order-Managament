import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import { joinAll, convertToThousands } from '../utils/helpers';


export const Templates = (orders, textStyles, elementStyles, colorStyles, getTotal) => {
    return [
        (
            <div>
                <Typography className={textStyles.muteText}>
                    Subject: <span style={{ color: 'white' }}> Order Details - (Account Name)</span>
                </Typography>
                <Typography className={textStyles.muteText}>
                    Dear Sir/Madam, <br />
                </Typography>
                <Typography className={textStyles.muteText}>
                    This is to remind you that there are one or more open invoices on your account. Please
                    provide at your earliest convenience an update on the payment details or clarify the reason
                    for the delay. If you have any specific issue with the invoice(s), please let us know so
                    that we can address it to the correct Department.
                        </Typography>
                <Typography className={textStyles.muteText}>
                    Please find the details of the invoices below:
                        </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                Invoice Number
                                    </TableCell>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                PO Number
                                    </TableCell>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                Invoice Date
                                    </TableCell>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                Due Date
                                    </TableCell>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                Currency
                                    </TableCell>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                Open Amount($)
                                    </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => {
                            return (
                                <TableRow
                                    key={order.salesOrderID}
                                    className={joinAll(colorStyles.tableRow, elementStyles.tableRow)}
                                >
                                    <TableCell
                                        className={joinAll(elementStyles.tableCell, textStyles.tableCellText, elementStyles.tableCellRoundedCornerLeft)}
                                    >
                                        {order.salesOrderID}
                                    </TableCell>
                                    <TableCell className={joinAll(textStyles.tableCellText, elementStyles.tableCell)}>{order.salesOrderID}</TableCell>
                                    <TableCell className={joinAll(elementStyles.tableCell, textStyles.tableCellText)}>{order.salesOrderDate}</TableCell>
                                    <TableCell className={joinAll(elementStyles.tableCell, textStyles.tableCellText)}>{order.dueDate}</TableCell>
                                    <TableCell className={joinAll(elementStyles.tableCell, textStyles.tableCellText)}>{order.salesOrderCurrency ? order.salesOrderCurrency : 'USD'}</TableCell>
                                    <TableCell className={joinAll(elementStyles.tableCell, textStyles.tableCellText)}>{convertToThousands(order.openAmount)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <Typography className={textStyles.muteText}>
                    Total Amount to be Paid: <span style={{ color: 'white' }}>{`$${getTotal()}`}</span>
                </Typography>
                <Typography className={textStyles.muteText}>
                    In case you have already made a payment for the above items, please send us the details
                        to ensure the paymeny is posted <br />
                        Let us know if we can be of any further assistance. Looking forward to hearing from you.
                        </Typography>
                <Typography className={textStyles.muteText}>
                    Kind Regards, <br />
                    [First Name][Last Name]
                </Typography>
            </div>
        ),
        (
            <div>
                <Typography className={textStyles.muteText}>
                    Subject: <span style={{ color: 'white' }}> Order Details - (Account Name)</span>
                </Typography>
                <Typography className={textStyles.muteText}>
                    Dear Sir/Madam, <br />
                            Greetings! <br />
                </Typography>
                <Typography className={textStyles.muteText}>
                Gentle reminder that you have one or more open invoices on your account. 
                Please get back to us with an expected date of payment. 
                If you have any specific issue with the invoice(s), 
                please let us know so that we can address it at the earliest. <br />
                        </Typography>
                <Typography className={textStyles.muteText}>
                    Please find the details of the invoices below:
                        </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                Invoice Number
                                    </TableCell>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                PO Number
                                    </TableCell>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                Invoice Date
                                    </TableCell>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                Due Date
                                    </TableCell>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                Currency
                                    </TableCell>
                            <TableCell
                                align='left'
                                className={joinAll(elementStyles.tableCell, textStyles.headerCellText)}
                            >
                                Open Amount($)
                                    </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => {
                            return (
                                <TableRow
                                    key={order.salesOrderID}
                                    className={joinAll(colorStyles.tableRow, elementStyles.tableRow)}
                                >
                                    <TableCell
                                        className={joinAll(elementStyles.tableCell, textStyles.tableCellText, elementStyles.tableCellRoundedCornerLeft)}
                                    >
                                        {order.salesOrderID}
                                    </TableCell>
                                    <TableCell className={joinAll(textStyles.tableCellText, elementStyles.tableCell)}>{order.salesOrderID}</TableCell>
                                    <TableCell className={joinAll(elementStyles.tableCell, textStyles.tableCellText)}>{order.salesOrderDate}</TableCell>
                                    <TableCell className={joinAll(elementStyles.tableCell, textStyles.tableCellText)}>{order.dueDate}</TableCell>
                                    <TableCell className={joinAll(elementStyles.tableCell, textStyles.tableCellText)}>{order.salesOrderCurrency ? order.salesOrderCurrency : 'USD'}</TableCell>
                                    <TableCell className={joinAll(elementStyles.tableCell, textStyles.tableCellText)}>{convertToThousands(order.openAmount)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                
                <Typography className={textStyles.muteText}>
                    In case you have already made a payment for the above items, please send us the details
                        to ensure the paymeny is posted <br />
                        Let us know if we can be of any further assistance. Looking forward to hearing from you.
                        </Typography>
                <Typography className={textStyles.muteText}>
                    Kind Regards, <br />
                    [First Name][Last Name]
                </Typography>
            </div>
        )
    ]
}