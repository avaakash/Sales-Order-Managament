import React from 'react';
import deleteOrder from '../services/deleteOrder';
import FormDialog from './form/FormDialog';
import { element, colors, text } from '../utils/styles';
import { Button, ButtonGroup, Typography, } from '@material-ui/core';
import { joinAll } from '../utils/helpers';

export default function DeleteOrder(props) {

    const { 
        isOpen, handleClose, selected, setSelected, responseData, 
        setResponseData, setErrorMessage, showErrorBar 
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
                setErrorMessage(error)
                showErrorBar();
            })
    }

    const title = 'Delete Invoice(s)'
    const body = (
        <div>
            <h2>Delete record(s)?</h2>
            <p>You'll lose your record(s) after this action. We can't recover them once you delete</p>
            <p>Are you sure you want to <span>permanently delete</span> them?</p>
        </div>
    )

    const footer = (
        <ButtonGroup>
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
        </ButtonGroup>
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