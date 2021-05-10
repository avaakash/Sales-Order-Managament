import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from 'react';
import { element } from '../../utils/styles';


export default function Field(props) {
    const { field, value, handleChange, handleDateChange, error } = props;

    const elementStyles = element();

    
    function getInputType() {
        switch (field.type) {
            case 'textarea': return <TextField
                variant='outlined'
                id={`${field.fieldName}_id`}
                name={field.fieldName}
                value={value[field.fieldName]}
                onChange={handleChange}
                label={field.label}
                error={error}
                rows={3}
                required={field.required}
                multiline
                InputProps={{
                    classes: {
                        root: elementStyles.input,
                        focused: elementStyles.inputFocused,
                        notchedOutline: elementStyles.inputOutline
                    }
                }}   
                InputLabelProps={{
                    className: elementStyles.inputLabel
                }}    
            />
            case 'date': return <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                inputVariant='outlined'
                variant='inline'
                openTo='year'
                label={field.label}
                id={`${field.fieldName}_id`}
                name={field.fieldName}
                clearable
                views={['month', 'date']}
                value={value[field.fieldName]}
                onChange={(date) => handleDateChange(date, field.fieldName)}
                initialFocusedDate={Date()}

            />
            </MuiPickersUtilsProvider> 
            case 'message': return <div dangerouslySetInnerHTML={{__html: field.message}} />

            case 'hidden': return <input type='hidden' />
            
            default: return <TextField
                variant='outlined'
                id={`${field.fieldName}_id`}
                name={field.fieldName}
                value={value[field.fieldName]}
                onChange={handleChange}
                label={field.label}
                error={error}
                required={field.required}
                InputProps={{
                    classes: {
                        root: elementStyles.input,
                        focused: elementStyles.inputFocused,
                        notchedOutline: elementStyles.inputOutline
                    }
                }}   
                InputLabelProps={{
                    className: elementStyles.inputLabel
                }}                 
            />
        }
    }

    return (getInputType())
}