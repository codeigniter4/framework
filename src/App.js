import React from 'react';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import RouterComponent from './components/routerComponent';
import Navigator from './components/Navigator/drawer';
import NavigatorStatic from './components/Navigator/static';
import Header from './components/Header';
import history from './utils/history';
import './App.scss';
import { styles, theme } from './styles/';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://vanguard-trucking.com">
        Vanguard Trucking llc
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App(props) {
  const { classes } = props;
  const showNav = useMediaQuery('(min-width:400px)');

  const [state, setState] = React.useState({
    left: false
  });
  const toggleDrawer = (anchor) => {
    setState({ ...state, [anchor]: !state.left });
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <div className={`dc_test ${classes.app}`}>
            <Header toggleDrawer={toggleDrawer} showToggle={!showNav}/>
            {showNav ?
              <NavigatorStatic toggleDrawer={toggleDrawer} anchor="left" open={state["left"]} history={history} className={classes.nav}/> :
              <Navigator toggleDrawer={toggleDrawer} anchor="left" open={state["left"]} history={history} className={classes.nav}/>
            }
            <main className={classes.main}>
              <RouterComponent history={history}/>
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
