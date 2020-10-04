import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { navigation } from './menuItems';
import iconLogo from '../../assets/icon.svg';



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
  const { toggleDrawer, anchor, open, history, classes } = props;
  const navigate = (location) => {
    history.push(`/vgdt-admin/${location}`);
  }

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
          style={{"margin":"10px 50px"}}
          spacing={1}
          alt="Vanguard Trucking llc icon"
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
