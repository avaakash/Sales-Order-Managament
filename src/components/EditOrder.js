import React from 'react';
import editOrder from '../services/editOrder';
import FormDialog from './form/FormDialog';
import { edit } from '../utils/formFields';
import { Button, Grid, Typography, } from '@material-ui/core';
import Form from './form/Form';
import { element, colors, text } from '../utils/styles';
import { joinAll, changeEditedRow, getDataFromID, makeRequestData } from '../utils/helpers';
import { emptyValidator } from '../utils/errors';
import { pxToRem } from '../utils/sizing';


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
            return null;
        })
        return errorFields;
    })

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    React.useEffect(() => {
        if (isOpen === true && selected.length > 0) {
            setFormData(makeRequestData(edit, getDataFromID(selected[0], responseData)))
        }
    },
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
                setError={setError}
            />
        </form>
    )

    const footer = (
        <Grid 
            container
            justify='flex-start'
            alignItems='center'
            spacing={1}
            style={{
                marginTop: pxToRem(5),
                marginBottom: pxToRem(5)
            }}
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
            <Grid 
                item
                style={{marginLeft: '25%'}}
            >
                <Button
                    className={joinAll(colorStyles.buttonActiveOutline, elementStyles.button)}
                    type="button"
                    id="clear"
                >
                    <Typography className={textStyles.buttonText}>
                        Reset
            </Typography>
                </Button>
            </Grid>
            <Grid item>
                <Button
                    type="submit"
                    className={joinAll(colorStyles.buttonActiveFilled, elementStyles.button)}
                    id="submit"
                    onClick={handleSubmit}
                >
                    <Typography className={textStyles.buttonText}>
                        Save
            </Typography>
                </Button>
            </Grid>
        </Grid >

    )
    return (
        <FormDialog
            isOpen={isOpen}
            handleClose={handleClose}
            body={body}
            footer={footer}
            title={title}
            className={elementStyles.editModal}
        />
    )
}