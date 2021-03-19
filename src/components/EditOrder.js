import React from 'react';
import axios from 'axios';
import editOrder from '../services/editOrder';
import { makeRequestData } from '../utils/helpers';
import FormDialog from './form/FormDialog';
import { edit } from '../utils/formFields';
import { Button, ButtonGroup, Typography, } from '@material-ui/core';
import Form from './form/Form';
import { element, colors, text } from '../utils/styles';
import { joinAll, changeEditedRow } from '../utils/helpers';



export default function EditOrder(props) {
    
    const { isOpen, handleClose, setResponseData, responseData, selected, setSelected } = props
    const [formData, setFormData] = React.useState(makeRequestData(edit, 'salesOrderID', selected[0]));
    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    const handleSubmit = (e) => {
        e.preventDefault();
        editOrder(formData)
            .then((res) => {
                console.log(formData)
                setResponseData(changeEditedRow(responseData, formData, 'edit'));
                setSelected([]);
                handleClose();
            })
            .catch((error) => console.log(error))
    }

    

    const title = 'Edit Invoice'
    const body = (
        <form id="editOrderForm" onSubmit={handleSubmit}>
            <Form
                fields={edit}
                formData={formData}
                setFormData={setFormData}
            />
        </form>
    )

    const footer = (
        <div>
        <Button
            type="button"
            id="cancel"
            onClick={handleClose}
        >
            <Typography className={joinAll(textStyles.buttonText, colorStyles.textBlue)}>
                Cancel
            </Typography>
        </Button>
        <ButtonGroup>
            <Button
                className={joinAll(colorStyles.buttonActiveOutline, elementStyles.button)}
                type="button"
                id="clear"
            >
                <Typography className={textStyles.buttonText}>
                    Clear
            </Typography>
            </Button>
            <Button
                type="submit"
                className={joinAll(colorStyles.buttonActiveFilled, elementStyles.button)}
                id="submit"
                onClick={handleSubmit}
            >
                <Typography className={textStyles.buttonText}>
                    Add
            </Typography>
            </Button>
        </ButtonGroup>
    </div>

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