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
    marginBottom: theme.spacing(1)
  },

  form: {
    width: 300,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },

  buttonContainer: {
    marginTop: theme.spacing(17),
  },
  input_box_label: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(1),
    fontSize: '0.875em',
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
  btnForgot: {
    '& .MuiButton-label': {
      textTransform: 'none',
      fontSize: '1em',
    },
    width: '100%',
    color: theme.palette.black,
  },
  btnBack: {
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
    fontWeight: 500,
  },
  progressContainer: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    color: theme.palette.pink
  }
}));

export default useStyles;
