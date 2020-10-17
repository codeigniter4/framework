import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';
import mainLogo from '../../assets/logo.png';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 10,
    width: 'calc(100% - 240px)',
    [`@media (max-width:  1023px)`]: {
      paddingLeft: theme.spacing(2, 2),
      paddingRight: theme.spacing(2, 2),
      width: '100%'
    },
    alignSelf: 'flex-end'
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
  const { classes, toggleDrawer, showToggle } = props;
  const handleToggle = (e) => {
    e.preventDefault()
    toggleDrawer('left')
  }

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}
        component="div"
        className={classes.secondaryBar}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            {showToggle ? <Grid item xs={2} style={{"textAlign":"left"}}>
              <Tooltip title="Toggle Menu">
                <IconButton color="inherit" onClick={handleToggle}>
                  <MenuIcon/>
                </IconButton>
              </Tooltip>
            </Grid> :
            <Grid item xs={2}>
            </Grid>
            }
            <Grid item xs={8}>
              <Tooltip title="Vanguard Trucking - Admin">
                <img
                  src={mainLogo}
                  width={250}
                  style={{"margin":"30px 0 20px"}}
                  spacing={1}
                  alt="Vanguard Trucking logo"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={2} style={{"textAlign":"right"}}>
              <Tooltip title="Toggle Menu">
                <IconButton color="inherit" onClick={handleToggle}>
                  <PersonIcon />
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
  toggleDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
