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
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
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
  customer: {
    backgroundColor: '#666',
  },
  cardActions: {
    backgroundColor: '#eee'
  }
}));

export default function InvoiceCard(props) {
  const { data, actions, isMobile } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <Grid container spacing={0} alignItems="center" justify="space-between">
        <Grid item xs={12}>
          <CardHeader
          avatar={
            <Avatar aria-label="status" className={classes.customer}>

            </Avatar>
          }
          title={`Customer`}
          subheader={`${data['*Customer']}`}
        />
      </Grid>
      <Grid item xs={12}>
          <CardHeader
          avatar={
            <Avatar aria-label="status" className={classes.avatar2}>
              $
            </Avatar>
          }
          title={`${data.ItemDescription}`}
          subheader={`$${data['*ItemAmount']}.00`}
        />
      </Grid>
        <Grid item xs={12}>
          <CardHeader
          avatar={
            <Avatar aria-label="pickup" className={classes.status}>
              #
            </Avatar>
          }
          title={`${data['*InvoiceNo']}`}
          subheader={`${data.ProductService}`}
        />
        </Grid>
        <Grid item xs={12}>
          <CardHeader
          avatar={
            <Avatar aria-label="drop" className={classes.avatar}>
              <LocalShippingIcon/>
            </Avatar>
          }
          title={`${data.ServiceDate}`}
          subheader={data.view}
        />
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
                <b>Due Date:</b> {data['*DueDate']}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Billing Address:</b>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.BillingAddress}
              </Typography>

            </CardContent>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
}
