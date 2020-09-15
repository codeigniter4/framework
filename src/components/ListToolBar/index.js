import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  add: {
    marginRight: theme.spacing(1),
  }
});

function ListToolBar(props) {
  const { classes, handleAdd, handleChange } = props;

      return (
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                  onChange={handleChange}
                />
              </Grid>
              { handleAdd ? 
              <Grid item>
                <Button variant="contained" color="primary" className={classes.add} onClick={handleAdd}>
                  Add
                </Button>
              </Grid>
              : '' }
            </Grid>
          </Toolbar>
        </AppBar>
      )
}

ListToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListToolBar);
