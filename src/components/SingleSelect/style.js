import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%',
    },
    name_select_box: {
        fontStyle: 'italic',
        color: '#aeaeae',
        fontWeight: '400',
        '& .MuiInputLabel-outlined .MuiInputLabel-shrink': {
            transform: 'translate(14px -100px) scale(0.5)',
        },
    },
    input_box: {
			'&.MuiInputBase-root.Mui-disabled': {
				color: theme.palette.text.primary,				
			},
    '& svg': {
			fill: theme.palette.text.secondary
		},
			color: theme.palette.text.primary,
        '& select': {
            border: `1px solid ${theme.palette.gray}`,
            borderRadius: '0px'
        },
        '& .MuiOutlinedInput-input': {
            padding: '10px 20px'
        }
    }
}));

export default useStyles;