import { makeStyles } from '@material-ui/core/styles';

export const paperStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
}));


export const paperStylesTable = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    [`@media (max-width:  1024px)`]: {
      width: 728,
      margin: '0 auto'
    },[`@media (max-width:  440px)`]: {
      width: 350,
      margin: '0 auto'
    }
  },
  counter: {
    top: 55,
    position: 'fixed',
    zIndex: 11,
    textTransform: 'capitalize',
    color: "#fff",
  }
}));
