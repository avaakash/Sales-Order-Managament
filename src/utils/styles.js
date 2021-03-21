import { makeStyles } from '@material-ui/core/styles';

const colors = makeStyles({
    lightBackground: {
        backgroundColor: '#58687E'
    },
    darkBackground: {
        backgroundColor: '#273D49CC'
    },
    modalGreen: {
        backgroundColor: '#2A3E4C'
    },
    selectedElement: {
        backgroundColor: '#2A5368'
    },
    oddTableElement: {
        backgroundColor: '#283A46'
    },
    buttonActiveOutline: {
        border: '1px solid #14AFF1',
        '&:disabled': {
            color:'#97A1A9',
            border: '1px solid #97A1A9',

        },
    },
    buttonActiveFilled: {
        backgroundColor: '#14AFF1',
        '&:disabled': {
            backgroundColor:'#97A1A9'
        },
    },
    textRed: {
        color: '#FF5B5B',
    },
    textBlue: {
        color: '#14AFF1'
    },
    tableRow: {
        borderRadius: '5px',
        "&$selected, &$selected:hover": {
            backgroundColor: "#2A5368"
        },
        '&:hover': {
            backgroundColor:'273D49CC'
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#283A46',
        },
        '&:nth-of-type(even):hover': {
            backgroundColor: '#283A46',
        },
    },
})

const text = makeStyles({
    title: {
        color: 'white',
        fontSize: '28px'
    },
    buttonText: {
        fontSize: '1em',
        fontFamily: 'Ubuntu',
        letterSpacing: '0px',
        color: 'white'
    },
    tableCellText: {
        fontSize: '1rem',
        fontFamily: 'Ubuntu',
        letterSpacing: '0px',
        color: 'white'
    },
    headerCellText: {
        fontSize: '0.8rem',
        fontFamily: 'Ubuntu',
        letterSpacing: '0px',
        color: '#97A1A9'
    },
    muteText: {
        color: '#C0C6CA',
        fontSize: '15px',
        fontFamily: 'Ubuntu'
    },
    tableRow: {
        fontSize: "2rem",
    },
})

const element = makeStyles({
    button: {
        height: "2.813em",
    },
    tableCell: {
        borderBottom: 'none',
        padding: '0.6rem',
    },
    tableCellRoundedCornerLeft: {
        borderRadius: '4px 0px 0px 4px'
    },
    tableCellRoundedCornerRight: {
        borderRadius: '0px 4px 4px 0px'
    },
    inputSingle: {
        backgroundColor: '#283A46',
        height: '45px',
        widhth: '300px',
        borderRadius: '10px'
    },
    modal: {
        position:  'fixed',
        width: '800px',
        top: '403px',
        left: 'calc(50% - 300px)',
        bottom: '40px'
    },
})

export { colors, text, element }

