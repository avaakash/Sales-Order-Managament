import axios from 'axios';
import { FLASK_URL, SERVER_URL, ROLL_NUMBER } from '../utils/constants';


const predictDates = async (data) => {
    const URL = `${FLASK_URL}/predict`;
    const requestData = {
        'data': data,
        'id': `${ROLL_NUMBER}`
    };
    const result = await axios.post(URL, requestData);
    return await result;
}

const updatePredictedData = async(data) => {
    const URL = `${SERVER_URL}${ROLL_NUMBER}/UpdatePredictDates`;
    const result = await axios.post(URL, data);
    return await result;    
}

export { predictDates, updatePredictedData }