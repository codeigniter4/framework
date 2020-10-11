import React from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
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
    icon: (<SupervisedUserCircleIcon />),
    table: 'users'
  },
  {
    name: 'LoadBoard',
    route: 'loads',
    icon: (<PostAddIcon />),
    table: 'loads'
  },
  {
    name: 'Brokers',
    route: 'brokers',
    icon: (<BusinessIcon />),
    table: 'brokers'
  },
  {
    name: 'Invoices',
    route: 'invoices',
    icon: (<MonetizationOnIcon />),
    table: 'invoices'
  },
  // {
  //   name: 'Employees',
  //   route: 'employees',
  //   icon: (<LocalShippingIcon />),
  //   table: 'employees'
  // },
  {
    name: 'Drivers',
    route: 'employees/type/driver',
    icon: (<PeopleIcon />),
    table: 'employees',
    type: 'driver'
  },
  {
    name: 'Dispatch',
    route: 'employees/type/dispatch',
    icon: (<PeopleOutlineIcon />),
    table: 'employees',
    type: 'dispatch'
  },
  // {
  //   name: 'Equipment',
  //   route: 'equipment',
  //   icon: (<LocalShippingIcon />),
  //   table: 'equipment'
  // },
  {
    name: 'Tractors',
    route: 'equipment/type/tractor',
    icon: (<LocalShippingIcon />),
    table: 'equipment',
    type: 'tractor'
  },
  {
    name: 'Trailers',
    route: 'equipment/type/trailer',
    icon: (<LocalShippingIcon />),
    table: 'equipment',
    type: 'trailer'
  },
]
