import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import AddOrder from './AddOrder';
import DeleteOrder from './DeleteOrder';
import EditOrder from './EditOrder';
import SearchBar from './SearchBar';
import { colors, text, element } from '../utils/styles';
import { joinAll, getDataFromID, changeEditedRow } from '../utils/helpers';
import Typography from '@material-ui/core/Typography';
import CorrespondenceTemplate from './Correspondence';
import { predictDates, updatePredictedData } from '../services/predict';
import ErrorBar from './ErrorBar';


export default function Menu(props) {

    const [addOpen, setAddOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [correspondenceOpen, setCorrespondenceOpen] = React.useState(false);
    const [isErrorBarOpen, setErrorBarOpen] = React.useState(false);

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

    const handleErrorBarClose = () => {
        setErrorBarOpen(false);
    }

    const showError = () => {
        setErrorBarOpen(true);
    }

    const handlePredict = () => {
        predictDates(getDataFromID(selected, responseData))
            .then((res) => {
                for (const order of res.data) {
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
        <Grid 
            container
            style={{marginTop:"30px"}}
        >
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="baseline"
                xs={6}
                style={{marginBottom:"15px"}}
            >
                <Grid
                    item
                    style={{marginLeft:"2rem"}}
                >
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
                </Grid>

                <Grid
                    item
                >
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
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
                xs={6}
                
            >
                <Grid
                    item
                >
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
                </Grid>

                <Grid
                    item
                >
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
                </Grid>

                <Grid
                    item
                >
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
                </Grid>

                <Grid
                    item
                >
                    <SearchBar
                        setSearchActive={setSearchActive}
                        setSearchData={setSearchData}
                        setSearchQuery={setSearchQuery}
                    />
                </Grid>
            </Grid>
            <AddOrder
                isOpen={addOpen}
                handleClose={handleAddClose}
                setResponseData={setResponseData}
                responseData={responseData}
                showErrorBar={showError}
            />
            <EditOrder
                isOpen={editOpen}
                handleClose={handleEditClose}
                setResponseData={setResponseData}
                responseData={responseData}
                setSelected={setSelected}
                selected={selected}
                showErrorBar={showError}
            />
            <DeleteOrder
                isOpen={deleteOpen}
                handleClose={handleDeleteClose}
                setResponseData={setResponseData}
                responseData={responseData}
                setSelected={setSelected}
                selected={selected}
                showErrorBar={showError}
            />
            <CorrespondenceTemplate
                isOpen={correspondenceOpen}
                handleClose={handleCorrespondenceClose}
                orders={getDataFromID(selected, responseData)}
            />
            <ErrorBar
                open={isErrorBarOpen}
                handleClose={handleErrorBarClose}
            />
        </Grid>
    )
}