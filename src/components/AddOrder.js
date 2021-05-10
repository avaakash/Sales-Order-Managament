import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import { element, colors, text } from '../utils/styles';
import { joinAll } from '../utils/helpers';
import Form from './form/Form';
import addOrder from '../services/addOrder';
import { makeRequestData, clearFormData } from '../utils/helpers';
import FormDialog from './form/FormDialog';
import { add } from '../utils/formFields';
import { emptyValidator } from '../utils/errors';
import { pxToRem } from '../utils/sizing';


export default function AddOrder(props) {

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    const {
        isOpen, handleClose, setResponseData, responseData, showErrorBar
    } = props;


    const [formData, setFormData] = React.useState(makeRequestData(add));
    const [error, setError] = React.useState(() => {
        let errorFields = {}
        add.map((field) => {
            errorFields[field.fieldName] = null
            return null;
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
        <Grid
            container
            direction='row'
            justify='flex-end'
            alignItems='center'
            style={{
                marginTop: pxToRem(5),
                marginBottom: pxToRem(5)
            }}
        >
            <Grid 
                item
            >
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
            </Grid>
            <Grid 
                item
                style={{marginLeft:'3%'}}
            >
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
            className={elementStyles.addModal}
        />
    )
}