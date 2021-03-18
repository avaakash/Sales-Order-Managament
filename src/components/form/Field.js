import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from 'react';


export default function Field(props) {
    const { field, value, handleChange, handleDateChange, error } = props;
    
    function getInputType() {
        switch (field.type) {
            case 'textarea': return <TextField
                id={`${field.fieldName}_id`}
                name={field.fieldName}
                value={value[field.fieldName]}
                onChange={handleChange}
                label={field.label}
                multiline
            />
            case 'date': return <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                openTo='year'
                label={field.label}
                id={`${field.fieldName}_id`}
                name={field.fieldName}
                clearable
                views={['year', 'month', 'date']}
                value={value[field.fieldName]}
                onChange={(date) => handleDateChange(date, field.fieldName)}
                initialFocusedDate={Date()}

            />
            </MuiPickersUtilsProvider> 
            case 'message': return <div dangerouslySetInnerHTML={{__html: field.message}} />

            case 'hidden': return <input type='hidden' />
            
            default: return <TextField
                id={`${field.fieldName}_id`}
                name={field.fieldName}
                value={value[field.fieldName]}
                onChange={handleChange}
                label={field.label}
            />
        }
    }

    return (getInputType())
}