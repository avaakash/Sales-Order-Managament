import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { SERVER_URL, ROLL_NUMBER } from '../utils/constants';


export default function AddOrder(props) {

    const {isOpen, handleClose} = props
    const [added, setAdded] = React.useState(false);
    const [orderData, setOrderData] = React.useState({
        "customerName": "",
        "customerNumber": "",
        "salesOrderID": "",
        "salesOrderAmount": "",
        "dueDate": "",
        "notes": "",
        "salesOrderCurrency": "USD"
    })
    const form = React.useRef(null);
    
    const headers = {
        "Content-Type": "application/json"
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const URL = `${SERVER_URL}${ROLL_NUMBER}/CreateSalesOrder`;
        const data = new FormData(form.current);
        axios.post(URL, orderData)
            .then((res) => {
                setAdded(true);
            })
            .catch((error) => console.log(error)) 
    }

    const handelChange = (e) => {
        setOrderData({
            ...orderData,
            [e.target.name]: e.target.value
        });
    }

    const body = (
        <form ref={form} id="addOrderForm" onSubmit={handleSubmit}>
            <label htmlFor="customerName">Customer Name</label>
            <input id="customerName" onChange={handelChange} value={orderData.customerName} name="customerName" type="text" />

            <label htmlFor="customerNumber">Customer No.</label>
            <input id="customerNumber" onChange={handelChange} value={orderData.customerNumber} name="customerNumber" type="text" />

            <label htmlFor="salesOrderID">Sales Order No.</label>
            <input id="salesOrderID" onChange={handelChange} value={orderData.salesOrderID} name="salesOrderID" type="text" />

            <label htmlFor="salesOrderAmount">Sales Order Amount</label>
            <input id="salesOrderAmount" onChange={handelChange} value={orderData.salesOrderAmount} name="salesOrderAmount" type="text" />
            
            <label htmlFor="dueDate">Due Date</label>
            <input id="dueDate" onChange={handelChange} value={orderData.dueDate} name="dueDate" type="date" />

            <label htmlFor="notes">Notes</label>
            <textarea id="notes" onChange={handelChange} value={orderData.notes} name="notes" type="text" />

            <Button type="button" id="clear" >Clear</Button>    
            <Button type="submit" id="submit" >Add</Button>    
        </form>
    )
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="add-order"
            aria-describedby="add-order-moda"
        >
            {body}
        </Modal>
    )
}