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
import { red, green, yellow, grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Checkbox from '@material-ui/core/Checkbox';
import DoneIcon from '@material-ui/icons/Done';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import RoomIcon from '@material-ui/icons/Room';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

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
  dropoffLocation: {
    backgroundColor: red[600],
  },
  pickupLocation: {
    backgroundColor: green[500],
  },
  iconStatus: {
    backgroundColor: grey[100]
  },
  status: {
    backgroundColor: '#009be5',
  },
  rate: {
    backgroundColor: '#666',
  },
  Planning: {
    backgroundColor: grey[100]
  },
  Planning_icon: {
    color: yellow[600],
  },
  Scheduled: {
    backgroundColor: grey[100]
  },
  Scheduled_icon: {
    color: '#009be5'
  },
  Completed: {
    backgroundColor: grey[100],
  },
  Completed_icon: {
    color: red[600],
  },
  Live: {
    backgroundColor: grey[100],
  },
  Live_icon: {
    color: green[500],
  },
  Billed: {
    backgroundColor: grey[100]
  },
  Billed_icon: {
    color: grey[500]
  },
  status_bg: {
    backgroundColor: '#fff'
  },
  cardActions: {
    backgroundColor: grey[100]
  }
}));

const icons = (type, classes) => {
  const types = {
    Scheduled: <WatchLaterIcon className={classes[`${type}_icon`]}/>,
    Live: <PlayCircleFilledWhiteIcon className={classes[`${type}_icon`]}/>,
    Billed: <CheckCircleIcon className={classes[`${type}_icon`]}/>,
    Completed: <ErrorIcon className={classes[`${type}_icon`]}/>,
    Planning: <PauseCircleFilledIcon className={classes[`${type}_icon`]}/>,
    pickupLocation: <RoomIcon className={classes[`Live_icon`]}/>,
    dropoffLocation: <RoomIcon className={classes[`Completed_icon`]}/>,
    rate: <MonetizationOnIcon className={classes[`Live_icon`]}/>
  }

  return types[type] || false
}

export default function LoadCard(props) {
  const { data, actions, isMobile, selected, setSelected } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const totalMiles = parseInt(data.loadedMiles) + parseInt(data.deadHead);
  const ratePerMile = `$${Math.round(parseInt(data.rate)/totalMiles * 100) / 100}`;
  const isBilled = data.status === "Billed";

  return (
    <Card className={classes.root}>
      <Grid container spacing={0} alignItems="center" justify="space-between">
        <Grid item  xs={12} sm={12} md={3} className={classes[data.status]}>
            <CardHeader
            avatar={
              <Avatar aria-label="status" className={classes.status_bg}>
                {icons(data.status, classes)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
              </IconButton>
            }
            title={`${data.status}`}
            subheader={`Load Number: ${data.loadNumber}`}
          />
        </Grid>
        <Grid item  xs={12} sm={4} md={3}>
          <CardHeader
          avatar={
            <Avatar aria-label="pickup" className={classes.cardActions}>
              {icons('pickupLocation', classes)}
            </Avatar>
          }
          title={`${data.pickupLocation}`}
          subheader={`${data.pickupDate}`}
        />
        </Grid>
        <Grid item  xs={12} sm={4} md={3}>
          <CardHeader
          avatar={
            <Avatar aria-label="drop" className={classes.cardActions}>
              {icons('dropoffLocation', classes)}
            </Avatar>
          }
          title={`${data.dropoffLocation}`}
          subheader={`${data.dropoffDate}`}
        />
        </Grid>
        <Grid item  xs={12} sm={4} md={3}>
          <CardHeader
          avatar={
            <Avatar aria-label="rate" className={classes.cardActions}>
              {icons('rate', classes)}
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
