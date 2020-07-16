import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

function Header(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}
        component="div"
        className={classes.secondaryBar}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Button className={classes.button} variant="outlined" color="inherit" size="small">
                Upload
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
