import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper, Backdrop } from '@material-ui/core';
import { ModalContext } from '../../contexts/ModalContext';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #eee',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 800,
  },
}));

const AdminModal = (props) => {
  const classes = useStyles();
  return (
    <ModalContext.Consumer>{(context) => {
      const { openModal, toggleModal } = context;
      const handleClose = () => {
        toggleModal(false);
      };

      return (
          <Modal
            className={classes.modal}
            open={openModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Paper className={classes.paper}>
              {props.children}
            </Paper>
          </Modal>
      )
    }}
    </ModalContext.Consumer>
  );
}

AdminModal.propTypes = {};

export default AdminModal;
