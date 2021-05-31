import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
const pink = '#B30600';
const gray = '#44545e';
const green= '#44d82c';
const color = '#263238';
const btn_gray = '#000';
const pink_disable = '#a02000';
const gray_disable = '#404040';
const topbar_color = '#FFFFFF';
const topbar_background = '#575658';
const black_white = '#FFFFFF';
const sidebar_color = '#A0A0A0';
const sidebar_hover_color = '#EBECF0';
const sidebar_title_color = '#EBEBEB';
const card_border = 'none';
const pagination_background = 'rgba(0, 0, 0, 0.08)';
const white_black = '#000000';
export default {
  black,
  white,
  pink,
  gray,
  color,
  green,
  btn_gray,
  pink_disable,
  gray_disable,
	topbar_color,
	topbar_background,
	black_white,
	sidebar_color,
	sidebar_hover_color,
	sidebar_title_color,
	card_border,
	pagination_background,
  white_black,
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    main: colors.indigo[500],
    light: colors.indigo[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: '#F4F6F8',
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
	pagination_color: colors.blueGrey[900],
	btn_darkgray: 'black',
};
