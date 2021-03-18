import Field from './Field';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';


export default function Form(props) {
    const { fields, formData, setFormData } = props;

    const handleChange = (e) => {
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
                fields.map((field, index) => {
                    return (
                        <FormControl
                            key={index}
                            variant='outlined'
                        >
                            <Field
                                field={field}
                                value={formData}
                                handleChange={handleChange}
                                handleDateChange={(e, fieldName) => handleDateChange(e, fieldName)}
                            />
                        </FormControl>
                    )
                })
            }
        </div >
    )
}