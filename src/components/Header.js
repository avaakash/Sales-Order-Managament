import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import AddOrder from './AddOrder';


const useStyles = makeStyles((theme) => ({
    button: {
        fontSize: theme.fontSize(1),
    },
}))

export default function Header() {

    const [addOrderOpen, setAddOrder] = React.useState(false);

    const handleAddOrderOpen = () => {
        setAddOrder(true);
    }

    const handleAddOrderClose = () => {
        setAddOrder(false);
    }

    return (
        <Container maxWidth='sm'>
            <ul>
                <Button variant='contained'>Predict</Button>
                <Button variant='contained'>View Correspondence</Button>
                <Button variant='contained' onClick={handleAddOrderOpen} className={useStyles.button} startIcon={<AddIcon />}>Add</Button>
                <Button variant='contained' className={useStyles.button} startIcon={<EditIcon />}>Edit</Button>
                <Button variant='contained' className={useStyles.button} startIcon={<RemoveIcon />}>Delete</Button>
            </ul>
            <AddOrder
                isOpen={addOrderOpen}
                handleClose={handleAddOrderClose}
            />
        </Container>
    )
}