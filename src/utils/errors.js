const emptyValidator = (formData, setError, error) => {
    let flag = true;
    let key;
    let formErrors = error;
    for(key in formData) {
        if (formData[key] == null || formData[key].length <= 0) {
            flag = false;
            formErrors[key] = true
        } else {
            formErrors[key] = false            
        }
    }
    if (flag) {
        setError(error)
    }
    return flag;    
}

export { emptyValidator }