const joinAll = (...classes) => {
    return classes.join(" ")
}

const makeRequestData = (formData, idField, idValue) => {
    let data = {}
    formData.map((field) => {
        if(field === idField) {
            data[idField] = idValue;
        } else {
            data[field.fieldName] = field.value;
        }
    })
    console.log('helper: ', data, idField, idValue);
    return data;
}

export { joinAll, makeRequestData }