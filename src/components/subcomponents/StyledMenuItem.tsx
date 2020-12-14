import { withStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))(MenuItem);

export default StyledMenuItem;
