import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, Breadcrumbs, Grid } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useHistory } from 'react-router-dom';

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
  },
  flex: {
    display: 'flex',
    cursor: 'pointer',
    color: theme.palette.green
  },
  back: {
    color: theme.palette.green,
    fontWeight: 400
  }
}));

const BreadcrumbBack = props => {
  const { list, back_url, parent_class } = props;
  const history = useHistory();
  const classes = useStyles();
  const title = "Po zmianie opcji wyszukiwania formularz przeładuje się automatycznie";

  const handleBack = () => {
    history.push(back_url);
  }

  return (
    <Grid container spacing={0} justify="space-between" className={parent_class}>
      <Grid item>
        <Breadcrumbs aria-label="Ścieżka okruszków" className={classes.breadcrumb}>
          {
            list && list.map((item, index) => (
              <Typography key={index} color="textPrimary" className={classes.typo} title={title}>{item}</Typography>
            ))
          }
        </Breadcrumbs>
      </Grid>
      <Grid item>
        <div onClick={handleBack} className={classes.flex}>
          <ChevronLeftIcon fontSize="small" style={{ marginRight: '10px' }} />
          <Typography variant="h5" className={classes.back}>
            Powrót
          </Typography>
        </div>
      </Grid>
    </Grid>

  );
};

export default BreadcrumbBack;
