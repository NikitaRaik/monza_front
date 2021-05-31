import { makeStyles } from '@material-ui/styles';

const useGlobalStyles = makeStyles(theme => ({
  normal_font: {
		color: theme.palette.color,
		fontSize: '0.875em',
    fontWeight: 400,
    textAlign: 'center',
    lineHeight: '1.7em'
  },
  outline_button: {
    '&:hover': {
      backgroundColor: theme.palette.green
    },
    padding: '4px',
    borderRadius: '0px',
    border: `1px solid ${theme.palette.green}`,
    fontWeight: '300',
  },
  full_fill: {
    width: '100%'
  },
  breadcrumb_class: {
    margin: theme.spacing(3, 0, 2, 0)
  },
  input_box: {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.text.primary}`,
    padding: '10px 20px',
    width: '100%',
    fontSize: '0.8750em'
  },
  area: {
    width: '100%',
    padding: theme.spacing(2),
    fontSize: '1.3em'
  },
  greenIconButton: {
    '& svg': {
      fill: theme.palette.green
    },
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
  },
  iconButton: {
    '& svg': {
      fill: theme.palette.black
    },
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
  },
  icon: {
    height: '50%',
    fontSize: '0.8em'
  },
  root: {
    '& .MuiTableCell-root': {
      padding: theme.spacing(1.5)
    },
    cursor: 'pointer',
  },
  date_picker: {
    marginTop: theme.spacing(1),
  },
}));

export default useGlobalStyles;
