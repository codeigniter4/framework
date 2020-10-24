import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { lighten, makeStyles } from '@material-ui/core/styles';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.dark, 0.85),
        }
      : {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

 const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, handleDelete, selected, handleExport, handleCreateInvoice, setSelected } = props;
  const handleDeleteItems = (ids) => {
    handleDelete(ids);
    setSelected([]);
  }

  const handleExportItems = (ids) => {
    handleExport(ids);
    console.log('handleExportItems: ');
    setSelected([]);
  }

  return (
    numSelected > 0 ? (<Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >

        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>


      {numSelected > 0 ? (
        <React.Fragment>
          {handleCreateInvoice && handleCreateInvoice(selected, false) ? <Tooltip title="Create Invoice">
            <IconButton aria-label="create" onClick={() => {handleCreateInvoice(selected, true); setSelected([])}}>
              <NoteAddIcon/>
            </IconButton>
          </Tooltip> : ''}
          {handleExport ?<Tooltip title="Export">
            <IconButton aria-label="export" onClick={() => handleExportItems(selected)}>
              <ImportExportIcon/>
            </IconButton>
          </Tooltip> : ''}
          {handleDelete ? <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={() => handleDeleteItems(selected)}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip> : ''}
        </React.Fragment>

      ) : ''}
    </Toolbar>) : ''
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
