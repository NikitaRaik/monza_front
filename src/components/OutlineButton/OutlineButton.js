import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  filled_button: {
		'& .MuiButton-label': {
			textTransform: 'none',
			fontSize: '1em',
		},
		'&:hover': {
			border: `1px solid ${theme.palette.green}`,
			backgroundColor: theme.palette.green,
			color: theme.palette.black,
		},
		padding: theme.spacing(0.5, 2),
		borderRadius: '0px',
		fontWeight: '300',
		color: theme.palette.black,
		border: `1px solid ${theme.palette.green}`,
		[theme.breakpoints.up('xs')]: {
			marginRight: '0px',
		},
		[theme.breakpoints.up('md')]: {
			marginRight: '0px',
		},
	},
}));

const OutlineButton = props => {
  const { title, onClick, icon, parent_class } = props;

  const classes = useStyles();

  return (
    <Button variant="outlined" color="secondary" className={clsx(classes.filled_button, parent_class)} onClick={onClick}>
			{icon}
			{title}
		</Button>
  );
};

export default OutlineButton;
