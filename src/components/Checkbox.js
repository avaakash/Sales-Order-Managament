import { Checkbox, withStyles } from "@material-ui/core";
import checkboxOutline from '../assets/check_box_outline_blank-black-18dp.svg';


const StyledCheckbox = withStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    // icon: {
    //   borderRadius: 3,
    //   width: 20,
    //   height: 16,
    //   boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    //   backgroundColor: '#14AFF1',
    //   backgroundImage: {checkboxOutline},
    //   '$root.Mui-focusVisible &': {
    //     outline: '2px auto #14AFF1',
    //     outlineOffset: 2,
    //   },
    //   'input:hover ~ &': {
    //     backgroundColor: '#14AFF1',
    //   },
    //   'input:disabled ~ &': {
    //     boxShadow: 'none',
    //     background: '#14AFF1',
    //   },
    // },
    // checkedIcon: {
    //   backgroundColor: '#14AFF1',
    //   backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    //   '&:before': {
    //     display: 'block',
    //     width: 16,
    //     height: 16,
    //     content: '""',
    //   },
    //   'input:hover ~ &': {
    //     backgroundColor: '#14AFF1',
    //   },
    // },
  })(Checkbox);

  export {StyledCheckbox}