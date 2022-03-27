import { createTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const WHITE = '#ffffff';
const BLACK = '#000000';

function greyscale(scale) {
  if (scale <= 0) {
    return WHITE;
  }
  if (scale == 1) {
    return grey[50];
  }
  if (scale <= 10) {
    return grey[(scale-1) * 100];
  }
  return BLACK;
};

const PRIMARY = '#ffccbc';
const PRIMARY_LIGHT = 'rgb(255, 214, 201)';
const PRIMARY_DARK = '#af4448';

const SECONDARY = '#8c5c51';
const SECONDARY_LIGHT = '#be897d';
const SECONDARY_DARK = '#5d3229';

const ON_PRIMARY = BLACK;
const ON_SECONDARY = '#cccccc';

const ERROR = '#ff1744';


// Create a theme instance.
const theme = createTheme({
  
  palette: {
    type: 'dark',
    background: {
      default: '#303030',
      paper: '#1a1a1a',
      scale: (scale) => greyscale(scale),
      focused: greyscale(8),
      unfocused: greyscale(1),
    },
    primary: {
      main: '#a5d6a7',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#b2ebf2',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: 'rgba(0, 0, 0, 0.87',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  // palette: {
  //   type: 'dark',
  //   primary: {
  //     main: PRIMARY,
  //     light: PRIMARY_LIGHT,
  //     dark: PRIMARY_DARK,
  //   },
  //   secondary: {
  //     main: SECONDARY,
  //     light: SECONDARY_LIGHT,
  //     dark: SECONDARY_DARK,
  //   },
  //   text: {
  //     primary: ON_PRIMARY,
  //     secondary: ON_SECONDARY,
  //   },
  //   error: {
  //     main: ERROR,
  //   },
  //   button: {
  //     textTransform: 'none',
  //   }
  // },
});

export default theme;
