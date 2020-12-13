import { createMuiTheme } from '@material-ui/core/styles';
import { theme } from './root';

export const sidebarTheme = createMuiTheme(theme, {
  palette: {
    action: {
      selected: '#2087EE',
    },
  },
});
