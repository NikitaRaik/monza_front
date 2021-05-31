import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Grid } from '@material-ui/core';
import OutlineButton from 'components/OutlineButton';
import useGlobalStyles from 'assets/style/styles';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(3)
  },
  title: {
    fontSize: '1.2em',
    lineHeight: '1.2',
    fontWeight: '700'
  },
  card: {
    padding: theme.spacing(2),
  }
}));

const FullDetail = props => {
  const { title, type, children } = props;
  const global_classes = useGlobalStyles();

  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.main}>
      <Grid item xs={9}>
        <Card className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="h2" className={classes.title}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              {React.cloneElement(children)}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FullDetail;
