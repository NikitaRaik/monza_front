import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%'
    },
    name_select_box: {
        fontStyle: 'italic',
        color: '#aeaeae',
        fontWeight: '400',
        paddingLeft: '14px',
        marginTop: '-1px'
    },
    multiple_select: {
        '& .MuiSelect-outlined.MuiSelect-outlined': {
border: `1px solid ${theme.palette.gray}`,
            padding: '10px 20px',
            border: `1px solid ${theme.palette.gray}`,
            borderRadius: '0px',
        },
        marginTop: '-1px !important'
    }
}));

export default useStyles;