import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { LoadContext } from '../../contexts/LoadContext';

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
  const { classes, newLoad } = props;
  return (
    <LoadContext.Consumer>{(context) => {
      const { save } = context;
      const handleClick = () => {
        save(newLoad);
      }

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
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" className={classes.add} onClick={handleClick}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )
    }}
    </LoadContext.Consumer>
  );
}

ListToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListToolBar);
