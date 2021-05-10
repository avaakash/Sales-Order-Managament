import Field from './Field';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { pxToRem } from '../../utils/sizing';
import Grid from '@material-ui/core/Grid';

export default function Form(props) {
    const { fields, formData, setFormData, error, setError } = props;

    const handleChange = (e) => {
        if (e.target.value != null && e.target.value.length > 0) {
            setError({
                ...error,
                [e.target.name]: false
            })
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleDateChange = (date, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: date
        });

    }

    return (
        <div>
            {
                <Grid
                    container
                    justify='space-evenly'
                    spacing={2}
                > {
                        fields.map((field, index) => {
                            return (
                                <Grid
                                    item
                                    style={{ margin: pxToRem(18) }}

                                >
                                    <FormControl
                                        key={index}
                                        variant='outlined'
                                        size='medium'
                                        
                                    >
                                        <Field
                                            field={field}
                                            value={formData}
                                            handleChange={handleChange}
                                            handleDateChange={(e, fieldName) => handleDateChange(e, fieldName)}
                                            error={error[field.fieldName]}
                                        />
                                    </FormControl>
                                </Grid>
                            )
                        })}
                </Grid>
            }
        </div >
    )
}