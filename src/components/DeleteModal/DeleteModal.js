import React, { useEffect, useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Grid,
  Card,
  Button
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import { Alert } from 'components';

const DeleteModal = (props) => {
  const { title, openModal, handleClose, handleDelete, selectedIndex } = props;
  const classes = useStyles();

  useEffect(() => {
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Card className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {title}
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="secondary" className={classes.btnSave} onClick={() => { handleDelete(selectedIndex); handleClose(); }}>
                Tak
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="secondary" className={classes.btnCancel} onClick={() => { handleClose(); }}>
                Nie
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Fade>
    </Modal>
  );
};

export default withRouter(DeleteModal);
