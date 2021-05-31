import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.15), 0px 4px 5px 0px rgba(0,0,0,0.04), 0px 1px 10px 0px rgba(0,0,0,0.02)',
      left: '299px',
      width: 'calc(100% - 299px)',
      height: '56px',
      backgroundColor: theme.palette.black,
      display: 'flex',
      zIndex: '101'
    },
    flexGrow: {
      flexGrow: 1
    },
    signOutButton: {
      marginLeft: theme.spacing(1)
    },
    toolbar: {
      display: 'flex',
      width: '100%',
      padding: '0px 10px',
      justifyContent: 'space-between'
    },
    close_drawer_icon: {
      display: 'flex',
      justifyContent: 'center',
      color: theme.palette.topbar_color,
      '& .MuiSvgIcon-root': {
        fontSize: '1.3em'
      }
    },
    title: {
      fontSize: '1em',
      fontFamily: 'roboto',
      fontWeight: '400',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '23px',
			color: theme.palette.white
    },
    avatar: {

    },
    titlebar: {
      display: 'flex',
      color: theme.palette.topbar_color
    },
    avataricon: {
      fontSize: '1.3em',
      color: theme.palette.topbar_color
    },
		rightControllerArea: {
      display: 'flex'
    },
		controllerArea: {
			[theme.breakpoints.down('xs')]: {
        display: 'none',
      },
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
		helper: {
      color: theme.palette.topbar_color,
      fontSize: '8px',
      margin: theme.spacing(0, 2.5),
      display: 'flex',
      alignItems: 'center',
			cursor: 'pointer'
    },
		vertical_separator: {
      height: '100%',
      width: '1px',
      backgroundColor: theme.palette.topbar_color,    
		}
  }));

  export default useStyles;