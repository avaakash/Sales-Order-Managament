import React from 'react';
import deleteOrder from '../services/deleteOrder';
import FormDialog from './form/FormDialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import { element, colors, text } from '../utils/styles';
import { joinAll } from '../utils/helpers';
import { pxToRem } from '../utils/sizing';


export default function DeleteOrder(props) {

    const {
        isOpen, handleClose, selected, setSelected, responseData,
        setResponseData, showErrorBar
    } = props

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    const handleDelete = (e) => {
        e.preventDefault();
        deleteOrder(selected)
            .then((res) => {
                setResponseData(responseData.filter((el) => selected.indexOf(el.salesOrderID) < 0));
                setSelected([]);
                handleClose();
            })
            .catch((error) => {
                showErrorBar();
            })
    }

    const title = 'Delete record(s)?'
    const body = (
        <div>
            <p className={textStyles.muteText}>You'll lose your record(s) after this action. We can't recover them once you delete</p>
            <p className={textStyles.muteText}>Are you sure you want to <span style={{ color: '#FF5E5E' }}>permanently delete</span> them?</p>
        </div>
    )

    const footer = (
        <Grid
            container
            direction='row'
            justify='flex-end'
            alignItems='center'
            spacing={2}
            style={{
                marginTop: pxToRem(5),
                marginBottom: pxToRem(5)
            }}
        >
            <Grid item>
                <Button
                    className={joinAll(colorStyles.buttonActiveOutline, elementStyles.button)}
                    type="button"
                    id="cancel"
                    onClick={handleClose}
                >
                    <Typography className={textStyles.buttonText}>
                        Cancel
                    </Typography>
                </Button>
            </Grid>
            <Grid 
                item
                style={{marginRight:'1rem'}}
            >
                <Button
                    type="button"
                    className={joinAll(colorStyles.buttonActiveFilled, elementStyles.button)}
                    id="delete"
                    onClick={handleDelete}
                >
                    <Typography className={textStyles.buttonText}>
                        Delete
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    )

    return (
        <FormDialog
            isOpen={isOpen}
            handleClose={handleClose}
            body={body}
            footer={footer}
            title={title}
        />
    )
}