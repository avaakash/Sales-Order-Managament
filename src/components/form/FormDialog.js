import { element, colors, text } from '../../utils/styles';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseSVG from '../../assets/baseline-close-24px.svg'


export default function FormDialog(props) {

    const { isOpen, handleClose, body, footer, title, className } = props;

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    return (
            <Dialog
                open={isOpen}
                onClose={handleClose}
                maxWidth="md"
                className={className}
            >
                <Paper className={colorStyles.modalGreen}>
                    <DialogTitle className={textStyles.title}>
                        <div>
                            {title}
                            
                            <img 
                                alt='Close Icon'
                                src={CloseSVG} 
                                className={elementStyles.closeIcon}
                                onClick={handleClose}
                            />
                        </div>

                    </DialogTitle>
                    <DialogContent dividers>
                        {body}
                    </DialogContent>
                    <DialogActions>
                        {footer}
                    </DialogActions>
                </Paper>
            </Dialog>
    )
}