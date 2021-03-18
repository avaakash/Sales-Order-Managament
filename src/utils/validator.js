const nameValidation = (fieldName, fieldValue) => {
    if(fieldValue.trim() == '') {
        return `${fieldName} is required`
    }
}

const numberValidation = (fieldName, fieldValue) => {
    if(!/^[0-9]+$)/.test(fieldValue)) {
        return `${fieldName} can contain numbers only`
    }
}

