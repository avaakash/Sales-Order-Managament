import { Button, SnackbarContent, Typography } from '@material-ui/core';
import SnackBar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { colors } from '../utils/styles';

export default function ErrorBar(props) {
    const { open, handleClose }  = props

    const colorStyles = colors();

    const vertical = 'bottom';
    const horizontal = 'left';
    const message = "Mandatory fields can't be empty";

    return (
        <SnackBar
            anchorOrigin={{vertical, horizontal}}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
            className={colorStyles.darkBackground}
            action={
                <Button 
                    onClick={handleClose}
                    startIcon={<CloseIcon />}
                    size='small'
                />
            }
            message={(
                <div>
                    <ReportProblemOutlinedIcon />
                    {message}
                </div>
            )}
        />
    )
}