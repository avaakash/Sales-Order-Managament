import React from 'react';
import { Button, ButtonGroup, Typography, } from '@material-ui/core';
import { element, colors, text } from '../utils/styles';
import { joinAll } from '../utils/helpers';
import Form from './form/Form';
import addOrder from '../services/addOrder';
import { makeRequestData, clearFormData } from '../utils/helpers';
import FormDialog from './form/FormDialog';
import { add } from '../utils/formFields';
import { emptyValidator } from '../utils/errors';

export default function AddOrder(props) {

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    const { 
        isOpen, handleClose, setResponseData, responseData, setErrorMessage,
        showErrorBar
    } = props;

    const [formData, setFormData] = React.useState(makeRequestData(add));
    const [error, setError] = React.useState(() => {
        let errorFields = {}
        add.map((field) => {
            errorFields[field.fieldName] = null
        })
        return errorFields;
    })


    const handleSubmit = () => {
        if (emptyValidator(formData, setError, error)) {
            addOrder(formData)
            .then((res) => {
                handleClose();
                setResponseData([res.data, ...responseData])
            })
            .catch((error) => {
                setErrorMessage(error)
                showErrorBar();
            })
        } else {
            showErrorBar();
        }
    }

    const title = 'Add Invoice';
    const body = (
        <form id="addOrderForm" onSubmit={handleSubmit}>
            <Form
                fields={add}
                formData={formData}
                setFormData={setFormData}
                error={error}
                setError={setError}
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
                    onClick={() => clearFormData(formData, setFormData)}
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