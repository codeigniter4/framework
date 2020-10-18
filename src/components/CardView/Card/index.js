import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
    maxWidth: 345,
    marginBottom: 10
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
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatar2: {
    backgroundColor: green[500],
  },
}));

export default function ComplexCard(props) {
  const { data, actions } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="status" className={classes.avatar2}>
            P
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${data.pickupLocation}`}
        subheader={`${data.pickupDate}`}
      />
      <CardHeader
        avatar={
          <Avatar aria-label="Driver" className={classes.avatar}>
            D
          </Avatar>
        }
        title={`${data.dropoffLocation}`}
        subheader={`${data.dropoffDate}`}
      />
      <CardContent>
        <Typography component="h3">
          Status: {data.status}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Broker: {data.editBroker}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Rate: {data.rate}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Miles: {data.loadedMiles}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          DeadHead: {data.deadHead}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Notes:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.notes}
          </Typography>

        </CardContent>
      </Collapse>
    </Card>
  );
}
