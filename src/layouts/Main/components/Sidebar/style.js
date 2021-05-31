import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    drawer: {
      width: 300,
      backgroundColor: theme.palette.black,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    divider: {
      margin: theme.spacing(2, 0)
    },
    nav: {
      marginBottom: theme.spacing(2)
    },
    logoBlock: {
      textAlign: 'center',
      margin: theme.spacing(2)
    },
    main_logo: {
      width: '100%'
    },
    icon: {
      color: '#8b919a',
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(3),
      '&:hover': {
        color: '#EBECF0'
      },
    },
    logout: {
      padding: '20px 16px 20px 56px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontWeight: 400,
      fontSize: '1em',
      color: '#8b919a',
      lineHeight: '1em',
      '&:hover': {
        backgroundColor: '#1e202c',
        color: '#EBECF0',
      },
      position: 'absolute',
      bottom: '0px'
    },
  }));
  export default useStyles;