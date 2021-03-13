import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { SERVER_URL, ROLL_NUMBER } from '../utils/constants';

export default function DeleteOrder(props) {

    const { isOpen, handleClose, deleteList, responseData, setResponseData } = props

    const handleDelete = (e) => {
        e.preventDefault();
        const URL = `${SERVER_URL}${ROLL_NUMBER}/DeleteSalesOrder`;
        axios.post(URL, deleteList)
            .then((res) => {
                setResponseData(responseData.filter((el) => deleteList.indexOf(el.salesOrderID) < 0));
                handleClose();
            })
            .catch((error) => console.log(error))
    }

    const body = (
        <div>
            <div>
                <h2>Delete record(s)?</h2>
                <p>You'll lose your record(s) after this action. We can't recover them once you delete</p>
                <p>Are you sure you want to <span>permanently delete</span> them?</p>
            </div>
            <div>
                <button id="close" onClick={handleClose}>Cancel</button>
                <button id="delete" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="delete-order"
            aria-describedby="delete-order-modal"
        >
            {body}
        </Modal>
    )
}