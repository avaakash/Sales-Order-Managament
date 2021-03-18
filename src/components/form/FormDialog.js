import { element, colors, text } from '../../utils/styles';
import { Button, CardContent, CardHeader, Typography, Card, Paper } from '@material-ui/core';
import { joinAll } from '../../utils/helpers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function FormDialog(props) {

    const { isOpen, handleClose, body, footer, title } = props;

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            className={elementStyles.modal}
            hideBackdrop
        >
            <Paper className={colorStyles.modalGreen}>
                <DialogTitle className={textStyles.title}>
                    { title }
                </DialogTitle>
                <DialogContent>
                    { body }
                </DialogContent>
                <DialogActions>
                    { footer }
                </DialogActions>
            </Paper>
        </Dialog>
    )
}