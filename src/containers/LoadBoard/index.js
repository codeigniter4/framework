import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Navigator from '../../components/Navigator';
import LoadListView from '../../components/LoadListView';
import Header from '../../components/Header';
import LoadContextProvider from '../../contexts/LoadContext';
// import ModalContextProvider from '../../contexts/ModalContext';
// import AdminModal from '../../components/AdminModal';
// import LoadForm from '../../components/LoadForm';
// import FullScreenDialog from '../../components/FullScreenDialog';
import { styles, drawerWidth, theme } from './styles/';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://vanguard-trucking.com">
        Vanguard Trucking llc
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function Loadboard(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <LoadContextProvider>
          <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer}>
              <Hidden smUp implementation="js">
                <Navigator
                  PaperProps={{ style: { width: drawerWidth } }}
                  variant="primary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                />
              </Hidden>
              <Hidden xsDown implementation="css">
                <Navigator PaperProps={{ style: { width: drawerWidth } }} />
              </Hidden>
            </nav>
            <div className={classes.app}>
              <Header onDrawerToggle={handleDrawerToggle} />
              <main className={classes.main}>
                <Paper className={classes.paper}>
                    <LoadListView />
                </Paper>
              </main>
              <footer className={classes.footer}>
                <Copyright />
              </footer>
            </div>
          </div>
      </LoadContextProvider>
    </ThemeProvider>
  );
}

Loadboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loadboard);
