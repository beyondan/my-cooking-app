import { createMuiTheme } from '@material-ui/core/styles';
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

const PRIMARY = '#e57373';
const PRIMARY_LIGHT = '#ffa4a2';
const PRIMARY_DARK = '#af4448';

const SECONDARY = '#8c5c51';
const SECONDARY_LIGHT = '#be897d';
const SECONDARY_DARK = '#5d3229';

const ON_PRIMARY = BLACK;
const ON_SECONDARY = '#cccccc';

const ERROR = '#ff1744';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY,
      light: PRIMARY_LIGHT,
      dark: PRIMARY_DARK,
    },
    secondary: {
      main: SECONDARY,
      light: SECONDARY_LIGHT,
      dark: SECONDARY_DARK,
    },
    text: {
      primary: ON_PRIMARY,
      secondary: ON_SECONDARY,
    },
    error: {
      main: ERROR,
    },
    background: {
      default: WHITE,
      light: WHITE,
      dark: BLACK,
      scale: (scale) => greyscale(scale),
      focused: greyscale(8),
      unfocused: greyscale(1),
    },
  },
});

export default theme;
