import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, Breadcrumbs } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	breadcrumb: {
    color: theme.palette.black,
		fontFamily: 'roboto',
		display: 'flex',
		alignItems: 'center'
	},
  link: {
    color: theme.palette.green,
    fontSize: '0.8125em',
  },
  typo: {
		color: theme.palette.black,
    fontSize: '1em',
  }
}));

const Breadcrumb = props => {
  const { list, parent_class } = props;

  const classes = useStyles();
	const title = "Po zmianie opcji wyszukiwania formularz przeładuje się automatycznie";
  return (
    <Breadcrumbs aria-label="Ścieżka okruszków" className={clsx(classes.breadcrumb, parent_class)}>
      {
        list && list.map((item, index) => (
          <Typography key={index} color="textPrimary" className={classes.typo} title={title}>{item}</Typography>
        ))
      }
    </Breadcrumbs>
    
  );
};

export default Breadcrumb;
