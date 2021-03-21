const joinAll = (...classes) => {
    return classes.join(" ")
}

const makeRequestData = (formData, oldData) => {
    let data = {}
    if (oldData == null) {
        formData.map((field) => {
            data[field.fieldName] = field.value;
        })
    } else {
        oldData = oldData[0];
        formData.map((field) => {
            data[field.fieldName] = oldData[field.fieldName];
        });
    }
    return data;
}

const getDataFromID = (selected, data) => {
    let orders = data.filter((el) => selected.includes(el.salesOrderID))
    return orders;
}

const convertToThousands = (amount) => {
    return `${Math.round(amount/100)/10}K`;
}

const changeEditedRow = (data, changeData, type) => {
    let newData = data;
    let foundIndex = newData.findIndex(obj => obj.salesDocID === changeData.salesDocID);
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

const clearFormData = (data, setData) => {
    console.log('clear data');
    let newData = {};
    for(let key in data) {
        if(key == 'dueDate') {
            newData[key] = null;
        } else {
            newData[key] = "";
        }
    }
    console.log(newData);
    setData(newData);
}

export { 
    joinAll, makeRequestData, getDataFromID, convertToThousands, changeEditedRow, 
    getAgeingBucketString, clearFormData 
}