import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  green: {
    color: green[500]
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatar2: {
    backgroundColor: green[500],
  },
  status: {
    backgroundColor: '#009be5',
  },
  rate: {
    backgroundColor: '#666',
  },
  cardActions: {
    backgroundColor: '#eee'
  }
}));

export default function ComplexCard(props) {
  const { data, actions, isMobile } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const totalMiles = parseInt(data.loadedMiles) + parseInt(data.deadHead);
  const ratePerMile = `$${Math.round(parseInt(data.rate)/totalMiles * 100) / 100}`;

  return (
    <Card className={classes.root}>
      <Grid container spacing={0} alignItems="center" justify="space-between">
        <Grid item>
            <CardHeader
            avatar={
              <Avatar aria-label="status" className={classes.status}>
                {data.status[0]}
              </Avatar>
            }
            title={`${data.status}`}
            subheader={`${data.loadNumber}`}
          />
        </Grid>
        <Grid item>
          <CardHeader
          avatar={
            <Avatar aria-label="pickup" className={classes.avatar2}>
              P
            </Avatar>
          }
          title={`${data.pickupLocation}`}
          subheader={`${data.pickupDate}`}
        />
        </Grid>
        <Grid item>
          <CardHeader
          avatar={
            <Avatar aria-label="drop" className={classes.avatar}>
              D
            </Avatar>
          }
          title={`${data.dropoffLocation}`}
          subheader={`${data.dropoffDate}`}
        />
        </Grid>
        <Grid item>
          <CardHeader
          avatar={
            <Avatar aria-label="rate" className={classes.rate}>
              $
            </Avatar>
          }
          title={`Rate: $${data.rate}.00`}
          subheader={data.editBroker}
        />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="details">
              {data.edit}
            </IconButton>
            {data.status === 'Completed' && data.broker !== 'addNew' ?
              <IconButton aria-label="details">
                {data.genInvoice}
              </IconButton> : ''}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Load Number:</b> {data.loadNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Dispatch:</b> {data.user}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Miles:</b> {data.loadedMiles}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>DeadHead:</b> {data.deadHead}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Rate Per Mile:</b> {ratePerMile}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p"><b>Notes:</b></Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.notes}
              </Typography>

            </CardContent>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
}
