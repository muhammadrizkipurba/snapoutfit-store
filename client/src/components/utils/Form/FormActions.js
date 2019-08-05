export const validate = ( element, formdata=[] ) => {
    let error = [true, ''];

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? '* Email is not valid' : ''}`
        
        error = !valid ? [valid,message] : error; 
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formdata[element.validation.confirm].value; 
        const message = `${!valid ? '* Password does not match' : ''}`
        
        error = !valid ? [valid,message] : error;
    }
 
    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? '* This fill is required' : ''}`
        
        error = !valid ? [valid,message] : error; 
    }


    return error
}

export const update = ( element, formdata, formName ) => {
    const newFormdata = {
        ...formdata
    }

    const newElement = {
        ...newFormdata[element.name]
    }

    // Get the value from input
    newElement.value = element.event.target.value;

    // Validation Value
    if(element.blur) {
        let validData = validate(newElement, formdata);

        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]
    };

    newElement.touched = element.blur;
    newFormdata[element.name] = newElement;

    return newFormdata;
};

export const generateData = (formData, formName) => {
    let dataToSubmit = {};

    for( let key in formData){
        if(key !== 'confirmPassword') {
            dataToSubmit[key] = formData[key].value;
        }
    }

    return dataToSubmit;
}

export const isFormValid = (formData, formName) => {
    let formIsValid = true;

    for(let key in formData){
        formIsValid = formData[key].valid && formIsValid
    }

    return formIsValid;
}

export const populateOptionFields = (formData, arrData =[], field) => {
    const newArray = [];
    const newFormData = {...formData};

    arrData.forEach(item => {
        newArray.push({ key: item._id, value: item.name })
    });

    newFormData[field].config.options = newArray;
    return newFormData;
}

export const resetFields = (formData, formName) => {
    const resetFormData = {...formData}

    for(let key in resetFormData) {
        if( key === 'images') {
            resetFormData[key].value = [];
        } else {
            resetFormData[key].value = '';
        }
        resetFormData[key].valid = false;
        resetFormData[key].touched = false;
        resetFormData[key].validationMessage = '';
    }

    return resetFormData;
}

export const populateFields = (formData, fields) => {
    
    for(let key in formData){
        formData[key].value = fields[key];
        formData[key].valid = true;
        formData[key].touched = true;
        formData[key].validationMessage = '';
    }

    return formData;
}