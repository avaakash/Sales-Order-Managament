import { Checkbox, withStyles } from "@material-ui/core";
// import checkboxOutline from '../assets/check_box_outline_blank-black-18dp.svg';


const StyledCheckbox = withStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&$checked': {
        color: '#14AFF1',
      },
    },
    checked: {}
  })(Checkbox);

  export {StyledCheckbox}