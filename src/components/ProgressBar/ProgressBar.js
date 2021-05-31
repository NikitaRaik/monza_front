import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 	CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  progressContainer: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    color: theme.palette.green
  }
}));

const ProgressBar = props => {
  const { progressStatus } = props;

  const classes = useStyles();
	
  return (
    progressStatus && 
    <div className={classes.progressContainer}>
      <CircularProgress className={classes.progress} />
    </div>    
  );
};

export default ProgressBar;
