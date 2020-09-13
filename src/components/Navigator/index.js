import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, makeStyles, useTheme  } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GroupIcon from '@material-ui/icons/Group';
import iconLogo from '../../assets/icon.png';

const categories = [
  {
    id: '',
    children: [
      // { id: 'LoadBoard', icon: <ListItemIcon />, active: true },
      // { id: 'Brokers', icon: <ListItemIcon /> }
    ],
  },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232323',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { toggleDrawer, anchor, open, history, classes, ...other } = props;
  const navigate = (location) => {
    history.push(`/vgdt-admin/${location}`);
  }
  const navigation = [
    {
      name: 'LoadBoard',
      route: 'loadboard',
      icon: (<PostAddIcon />)
    },
    {
      name: 'Brokers',
      route: 'brokerboard',
      icon: (<GroupIcon />)
    }
  ]
  return (
    <Drawer anchor={anchor} open={open} onClose={() => toggleDrawer(anchor)}>
      <div
        role="presentation"
        onClick={() => toggleDrawer(anchor)}
        onKeyDown={() => toggleDrawer(anchor)}
      >
        <img
          src={iconLogo}
          width={100}
          style={{"margin":"50px"}}
          spacing={1}
        />
        <List>
          {navigation.map((item, index) => (
            <ListItem onClick={() => navigate(item.route)} button key={index} className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
