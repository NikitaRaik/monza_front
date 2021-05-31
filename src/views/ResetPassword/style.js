import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },

  loginForm: {
    width: 620,
  },

  description: {
    width: 620,
    marginBottom: theme.spacing(1),
  },

  title: {
    width: 450,
    margin: 'auto'
  },

  form: {
    width: 300,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },

  rememberMe: {
    marginTop: '30px',
    '& .MuiTypography-body1': {
      color: theme.palette.black,
      fontWeight: 500,
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: theme.palette.green
    },
  },
  buttonContainer: {
    marginTop: theme.spacing(10),
  },
  input_box_label: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontSize: '0.875em',
    color: theme.palette.black
  },
  input_box: {
    '& svg': {
      fill: theme.palette.text.secondary
    },
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.black_white,
    border: `1px solid ${theme.palette.text.primary}`,
    padding: '10px 20px',
    width: '100%',
  },
  error_log: {
    color: 'red',
    fontFamily: 'roboto',
    fontSize: '0.875em'
  },
  btnLogin: {
    '& .MuiButton-label': {
      textTransform: 'none',
      fontSize: '1em',
    },
    width: '100%',
    color: theme.palette.black,
  },
  rippleClass: {
    backgroundColor: 'red'
  },
  btnForgot: {
    marginTop: theme.spacing(2),
    '&:hover': {
      textDecoration: 'none'
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    color: theme.palette.black,
    fontSize: '0.9em',
    fontWeight: 600,
  },
  btnRegister: {
    marginTop: theme.spacing(8),
    '&:hover': {
      textDecoration: 'none'
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    color: theme.palette.green,
    fontSize: '0.9em',
    fontWeight: 500,
  },
  arrow: {
    color: theme.palette.green,
    marginLeft: theme.spacing(2)
  },
}));

export default useStyles;
