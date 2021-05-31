import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { SiteInfoContextConsumer } from "App";
import { makeStyles, useTheme } from '@material-ui/styles';
import useStyles from './style';
import {
  Grid, Button, Typography
} from '@material-ui/core';

import { useHistory } from 'react-router';
import constants from '../../utils/constants';

const Minimal = props => {
  const { children } = props;
	const history = useHistory();
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
		<SiteInfoContextConsumer>
    { (props) => (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <img className={classes.logo} src="/images/logo.png" alt="Logo" />        
        <main className={classes.content}>{children}</main>
      </Grid>
    </div>
		)}
    </SiteInfoContextConsumer>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;
