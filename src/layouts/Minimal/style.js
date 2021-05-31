import { makeStyles, useTheme } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.black_white,
    color: theme.palette.color,
    fontFamily: 'roboto',
    minHeight: '100vh',
    paddingTop: theme.spacing(12)
  },
  logo: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  
  content: {
    width: '100%',
    marginTop: theme.spacing(4)
  },
}));

export default useStyles;
