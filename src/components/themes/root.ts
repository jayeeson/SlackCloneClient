import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    MuiTouchRipple: {
      child: {
        backgroundColor: '#66666C',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 36,
      },
    },
  },
  palette: {
    action: {
      hover: '#44444C',
      disabled: 'cccccc',
      disabledBackground: '#505055',
    },
    background: {
      default: '#24292f',
      paper: '#515157',
    },
    divider: '#474747',
    text: {
      primary: '#d4d4d9',
      secondary: '#bcbcbc',
    },
    primary: {
      main: '#deded9',
    },
    secondary: {
      main: '#2087CC',
    },
    // success: {
    //   main: ''
    // }
  },
  typography: {
    fontSize: 12,
    allVariants: {
      color: '#ffffff',
      fontFamily: [
        '-apple-system',
        'Roboto',
        'Century Gothic',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  },
});
