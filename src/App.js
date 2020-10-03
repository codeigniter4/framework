import React from 'react';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import RouterComponent from './components/routerComponent';
import Navigator from './components/Navigator';
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
          <div className={classes.app}>
            <Header toggleDrawer={toggleDrawer} />
            <Navigator toggleDrawer={toggleDrawer} anchor="left" open={state["left"]} history={history}/>
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
