import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    MuiTouchRipple: {
      child: {
        backgroundColor: '#66666C',
      },
    },
  },
  palette: {
    action: {
      hover: '#44444C',
    },
    background: {
      default: '#24292f',
      paper: '#3a3acc',
    },
    divider: '#474747',
    text: {
      primary: '#d4d4d9',
      secondary: '#CECECE',
    },
    primary: {
      main: '#deded9',
    },
    secondary: {
      main: '#2087CC',
    },
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
