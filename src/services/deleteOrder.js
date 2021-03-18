import axios from 'axios';
import { SERVER_URL, ROLL_NUMBER } from '../utils/constants';

export default async function deleteOrder(data) {
    const URL = `${SERVER_URL}${ROLL_NUMBER}/DeleteSalesOrder`;
    const res = await axios.post(URL, data)
    return res;
};
