import React from 'react';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import RouterComponent from './components/routerComponent';
import Navigator from './components/Navigator';
import Header from './components/Header';
import history from './utils/history';
import './App.scss';
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

function App(props) {
  console.log(history);
  const { classes } = props;
  const handleDrawerToggle = () => {
    // setMobileOpen(!mobileOpen);
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="primary"
                history={history}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidth } }} history={history} />
            </Hidden>
          </nav>
          <div className={classes.app}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <main className={classes.main}>
              <Paper className={classes.paper}>
                <RouterComponent history={history}/>
              </Paper>
            </main>
            <footer className={classes.footer}>
              <Copyright />
            </footer>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default withStyles(styles)(App);
