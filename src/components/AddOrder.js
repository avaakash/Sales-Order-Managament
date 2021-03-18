import React from 'react';
import { Button, ButtonGroup, Typography, } from '@material-ui/core';
import { element, colors, text } from '../utils/styles';
import { joinAll } from '../utils/helpers';
import Form from './form/Form';
import addOrder from '../services/addOrder';
import { makeRequestData } from '../utils/helpers';
import FormDialog from './form/FormDialog';
import { add } from '../utils/formFields';


export default function AddOrder(props) {

    const elementStyles = element();
    const textStyles = text();
    const colorStyles = colors();

    const { isOpen, handleClose, setResponseData, responseData } = props;
    const [formData, setFormData] = React.useState(makeRequestData(add));

    const handleSubmit = () => {
        addOrder(formData)
            .then((res) => {
                console.log(res.data);
                handleClose();
                setResponseData([res.data, ...responseData])
            })
            .catch((error) => console.log(error))
    }

    const title = 'Add Invoice';
    const body = (
        <form id="addOrderForm" onSubmit={handleSubmit}>
            <Form
                fields={add}
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