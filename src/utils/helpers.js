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
    return data;
}

const getDataFromID = (selected, data) => {
    let orders = data.filter((el) => selected.includes(el.salesOrderID))
    console.log(orders);
    return orders;
}

const converToThousands = (amount) => {
    return `${amount/1000}K`;
}

const changeEditedRow = (data, changeData, type) => {
    let newData = data;
    console.log(changeData)
    let foundIndex = newData.findIndex(obj => obj.salesDocID === changeData.salesDocID);
    console.log(foundIndex);
    if (type === 'edit') {
        newData[foundIndex].salesOrderAmount = changeData.salesOrderAmount;
        newData[foundIndex].notes = changeData.notes;
    } else if (type === 'predict') {
        newData[foundIndex]['predictedPaymentDate'] = changeData.predictedPaymentDate;
        newData[foundIndex]['predictedAgeingBucket'] = changeData.predictedAgeingBucket;
    } else {

    }
    
    return newData;
}

const getAgeingBucketString = (x) => {
    switch(x) {
        case 1: return '<15 days';
        case 2: return '15-30 days';
        case 3: return '30-45 days';
        case 4: return '45-60 days';
        case 5: return '>60 days';
    }
}

export { joinAll, makeRequestData, getDataFromID, converToThousands, changeEditedRow, getAgeingBucketString }