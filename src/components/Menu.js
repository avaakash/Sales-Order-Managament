import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import ModalForm from './form/FormDialog';
import AddOrder from './AddOrder';
import DeleteOrder from './DeleteOrder';
import EditOrder from './EditOrder';
import SearchBar from './SearchBar';
import { colors, text, element } from '../utils/styles';
import { joinAll, getDataFromID, changeEditedRow } from '../utils/helpers';
import Typography from '@material-ui/core/Typography';
import CorrespondenceTemplate from './Correspondence';
import { predictDates, updatePredictedData } from '../services/predict';


export default function Menu(props) {

    const [addOpen, setAddOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [correspondenceOpen, setCorrespondenceOpen] = React.useState(false);

    const colorStyles = colors();
    const textStyles = text();
    const elementStyles = element();

    const { 
        setResponseData, responseData, selected, setSelected, 
        setSearchData, setSearchActive, setSearchQuery
    } = props;

    const handleAddClose = () => {
        setSelected([]);
        setAddOpen(false);
    }

    const handleEditClose = () => {
        setSelected([]);
        setEditOpen(false);
    }
    
    const handleDeleteClose = () => {
        setSelected([]);
        setDeleteOpen(false);
    }

    const handleCorrespondenceClose = () => {
        setCorrespondenceOpen(false);
    }

    const handlePredict = () => {
        predictDates(getDataFromID(selected, responseData))
            .then((res) => {
                console.log(res.data)
                for(const order of res.data) {
                    changeEditedRow(responseData, order, 'predict');
                };
            })
            .then((res) => {
                updatePredictedData(getDataFromID(selected, responseData))
                    .then((res) => {
                        setSelected([]);
                    })
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
    }
    
    return (
        <Grid container>
            <ul style={{display:'flex'}}>
                <div style={{float:'left'}}>
                <Button
                    className={joinAll(elementStyles.button, colorStyles.buttonActiveFilled)}
                    variant='contained'
                    disabled={selected.length < 1}
                    onClick={handlePredict}
                >
                    <Typography className={textStyles.buttonText}>
                        Predict
                    </Typography>
                </Button>
                <Button
                    variant='outlined'
                    className={joinAll(elementStyles.button, colorStyles.buttonActiveOutline)}
                    onClick={() => setCorrespondenceOpen(true)}
                    disabled={selected.length < 1}
                    size='small'
                >
                    <Typography className={textStyles.buttonText}>
                        View Correspondence
                    </Typography>
                </Button>
                </div>
                <div style={{float:'right'}}>
                <Button variant='outlined'
                    className={joinAll(elementStyles.button, colorStyles.buttonActiveOutline)}
                    onClick={() => setAddOpen(true)}
                    startIcon={<AddIcon />}
                    disabled={selected.length > 0}
                    size='small'
                >
                    <Typography className={textStyles.buttonText}>
                        Adit
                    </Typography>
                </Button>
                <Button variant='outlined'
                    className={joinAll(elementStyles.button, colorStyles.buttonActiveOutline)}
                    onClick={() => setEditOpen(true)}
                    startIcon={<EditIcon />}
                    disabled={selected.length !== 1}
                >
                    <Typography className={textStyles.buttonText}>
                        Edit
                    </Typography>
                </Button>
                <Button variant='outlined'
                    className={joinAll(elementStyles.button, colorStyles.buttonActiveOutline)}
                    onClick={() => setDeleteOpen(true)}
                    startIcon={<RemoveIcon />}
                    disabled={selected.length < 1}
                >
                    <Typography className={textStyles.buttonText}>
                        Delete
                    </Typography>
                </Button>
                <SearchBar
                    setSearchActive={setSearchActive}
                    setSearchData={setSearchData}
                    setSearchQuery={setSearchQuery}
                />
                </div>
            </ul>
            <AddOrder
                isOpen={addOpen}
                handleClose={handleAddClose}
                setResponseData={setResponseData}
                responseData={responseData}
            />
            <EditOrder
                isOpen={editOpen}
                handleClose={handleEditClose}
                setResponseData={setResponseData}
                responseData={responseData}
                setSelected={setSelected}
                selected={selected}
            />
            <DeleteOrder
                isOpen={deleteOpen}
                handleClose={handleDeleteClose}
                setResponseData={setResponseData}
                responseData={responseData}
                setSelected={setSelected}
                selected={selected}
            />
            <CorrespondenceTemplate
                isOpen={correspondenceOpen}
                handleClose={handleCorrespondenceClose}
                orders={getDataFromID(selected, responseData)}
            />
        </Grid>
    )
}