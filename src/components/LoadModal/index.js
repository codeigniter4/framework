import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { LoadContext } from '../../contexts/LoadContext';
import LoadForm from '../LoadForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LoadModal = (props) => {
  const classes = useStyles();

  return (
    <LoadContext.Consumer>{(context) => {
      const { openModal, toggleModal } = context;
      const handleClose = () => {
        toggleModal(false);
      };

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
            <LoadForm/>
          </Modal>
      )
    }}
    </LoadContext.Consumer>
  );
}

LoadModal.propTypes = {};

export default LoadModal;
