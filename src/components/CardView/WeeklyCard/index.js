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
import ContactlessIcon from '@material-ui/icons/Contactless';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LoadCard from '../LoadCard';
import { getWeek } from '../../../utils/getWeeks';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0px auto'
  },
  CardContainer: {
    backgroundColor: '#fff'
  },
  CardContent: {
    margin: '0px auto',
    borderTop: 'solid 1px #ddd'
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
  iconStatus: {
    backgroundColor: grey[100]
  },
  status: {
    backgroundColor: '#009be5',
  },
  status_bg: {
    backgroundColor: '#fff'
  },
  cardActions: {
    backgroundColor: '#fff'
  }
}));

const icons = (type, classes) => {
  const types = {
    Week: <WatchLaterIcon/>,
    Driver: <LocalShippingIcon/>
  }

  return types[type] || false
}

export default function WeeklyCard(props) {
  const { data, actions, isMobile, selected, handleSelected, expand } = props;
  const currentWeek = getWeek(new Date());
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(data.week === currentWeek);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>
      <Grid container spacing={0} alignItems="center" justify="space-between">
        <Grid item  xs={12} sm={12} md={6} className={""}>
            <CardHeader
            avatar={
              <Avatar aria-label="status" className={""}>
                {icons('Week')}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
              </IconButton>
            }
            title={`${data.week === currentWeek ? 'Current Week: ' + data.week : data.week < currentWeek ? 'Week: ' + data.week  :  'Upcoming Week: ' + data.week}`}
          />
          <CardContent>
           <Typography variant="body2" color="textSecondary" component="p">
             Total: ${data.rate}.00
           </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
             Total Miles: {parseInt(data.loadedMiles) + parseInt(data.deadHead)}
           </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
             Total Rate Per Mile: ${(parseInt(data.rate) / (parseInt(data.loadedMiles) + parseInt(data.deadHead))).toFixed(2)}
           </Typography>
          </CardContent>
        </Grid>
        <Grid item  xs={12} sm={12} md={6}>
          <CardHeader
            avatar={
              <Avatar aria-label="pickup" className={""}>
                {icons('Driver')}
              </Avatar>
            }
            title={`${data.driverName}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Rate: {data.driverRate}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Pay: {data.driverPay}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Detention Pay: ${data.detentionPay}.00
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardActions disableSpacing className={classes.cardActions}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="View Loads"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.CardContainer}>
        <Grid item xs={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.CardContent}>
                {data.rows.map((row, indx) => {
                return (
                    <Grid item xs={12} key={indx} id={row.id}>
                      <LoadCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected}/>
                    </Grid>
                  )
                })}
            </CardContent>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
}
