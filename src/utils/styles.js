import { makeStyles } from '@material-ui/core/styles';
import { pxToRem } from './sizing';

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
        color: '#FFFFFF',
        fontSize: '28px'
    },
    buttonText: {
        fontSize: pxToRem(20),
        fontFamily: 'Ubuntu',
        letterSpacing: '0px',
        color: '#FFFFFF'
    },
    tableCellText: {
        fontSize: pxToRem(20),
        fontFamily: 'Ubuntu',
        letterSpacing: '0px',
        color: '#FFFFFF'
    },
    headerCellText: {
        fontSize: pxToRem(18),
        fontFamily: 'Ubuntu',
        letterSpacing: '0px',
        color: '#97A1A9'
    },
    smallWhite: {
        fontSize: pxToRem(18),
        fontFamily: 'Ubuntu',
        letterSpacing: '0px',
        color: '#FFFFFF'
    },
    muteText: {
        color: '#C0C6CA',
        fontSize: '15px',
        fontFamily: 'Ubuntu',
        marginBottom:'2rem'
    },
    tableRow: {
        fontSize: "1.3rem",
    },
})

const element = makeStyles({
    button: {
        height: pxToRem(45),
        borderRadius: pxToRem(10),
        padding: pxToRem(20),
    },
    tableCell: {
        borderBottom: 'none !important',
        padding: pxToRem(10),
    },
    tableCellRoundedCornerLeft: {
        borderRadius: '4px 0px 0px 4px'
    },
    tableCellRoundedCornerRight: {
        borderRadius: '0px 4px 4px 0px'
    },
    searchBar: {
        backgroundColor: '#283A46',
        // border: '1px solid #356680',
        height: pxToRem(45),
        widhth: pxToRem(191),
        borderRadius: pxToRem(10)
    },
    addModal: {
        position:  'fixed',
        width: pxToRem(1106),
        top: pxToRem(509),
        marginLeft: pxToRem(407)
    },
    editModal: {
        position:  'fixed',
        width: pxToRem(543),
        top: pxToRem(210),
        marginLeft: pxToRem(689),
    },
    deleteModal: {
        position:  'fixed',
        width: pxToRem(611),
        top: pxToRem(294),
        marginLeft: pxToRem(654)
    },
    correspondenceModal: {
        position:  'fixed',
        width: '800px',
        top: '403px',
        left: 'calc(50% - 300px)',
        bottom: '40px'
    },
    imageIcon: {
        display: 'flex',
        paddingTop:"0.3rem",
        height: '65%',
    },
    closeIcon: {
        cursor:'pointer', 
        float:'right', 
        marginTop: '5px', 
        width: '20px'
    },
    dropdown: {
        height: pxToRem(20),
        fontSize: pxToRem(18)
    },
    input: {
        borderRadius: pxToRem(10),
        borderColor: '#356680',
        '&$hover': {
            borderRadius: pxToRem(10),
            borderColor: '#356680',
        }
    },
    inputOutline: {
        borderColor: '#356680',
    },
    inputFocused: {
        color: 'white',
        borderColor: '#356680',
    },
    inputLabel: {
        color: '#97A1A9',
    }
})

export { colors, text, element }

