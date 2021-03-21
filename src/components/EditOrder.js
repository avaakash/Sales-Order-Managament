import React from 'react';
import editOrder from '../services/editOrder';
import FormDialog from './form/FormDialog';
import { edit } from '../utils/formFields';
import { Button, ButtonGroup, Typography, } from '@material-ui/core';
import Form from './form/Form';
import { element, colors, text } from '../utils/styles';
import { joinAll, changeEditedRow, getDataFromID, makeRequestData } from '../utils/helpers';
import { emptyValidator } from '../utils/errors';



export default function EditOrder(props) {
    
    const { 
        isOpen, handleClose, setResponseData, responseData, selected, 
        setSelected, showErrorBar 
    } = props
    const [formData, setFormData] = React.useState(makeRequestData(edit));
    const [error, setError] = React.useState(() => {
        let errorFields = {}
        edit.map((field) => {
            errorFields[field.fieldName] = null
        })
        return errorFields;
    })

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    React.useEffect(() => {
        if(isOpen === true && selected.length > 0) {
            setFormData(makeRequestData(edit, getDataFromID(selected[0], responseData)))
        }}, 
        [isOpen]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emptyValidator(formData, setError, error)) {
            editOrder(formData)
            .then((res) => {
                setResponseData(changeEditedRow(responseData, formData, 'edit'));
                setSelected([]);
                handleClose();
            })
            .catch((error) => {
                showErrorBar();
            })
        } else {
            showErrorBar();
        }
        
    }  

    const title = 'Edit Invoice'
    const body = (
        <form id="editOrderForm" onSubmit={handleSubmit}>
            <Form
                fields={edit}
                formData={formData}
                setFormData={setFormData}
                error={error}
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