import { createMuiTheme } from '@material-ui/core';

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
      default: '#313134',
    },
    divider: '#838383',
    text: {
      primary: 'white',
      secondary: '#CECECE',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
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
