import React from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GroupIcon from '@material-ui/icons/Group';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';


export const navigation = [
  {
    name: 'Users',
    route: 'users',
    icon: (<SupervisedUserCircleIcon />)
  },
  {
    name: 'LoadBoard',
    route: 'loads',
    icon: (<PostAddIcon />)
  },
  {
    name: 'Brokers',
    route: 'brokers',
    icon: (<BusinessIcon />)
  },
  {
    name: 'Invoices',
    route: 'invoices',
    icon: (<MonetizationOnIcon />)
  },
  {
    name: 'Drivers',
    route: 'drivers',
    icon: (<PeopleIcon />)
  },
  {
    name: 'Dispatch',
    route: 'dispatch',
    icon: (<PeopleOutlineIcon />)
  },
  {
    name: 'Equipment',
    route: 'equipment',
    icon: (<LocalShippingIcon />)
  }
]
