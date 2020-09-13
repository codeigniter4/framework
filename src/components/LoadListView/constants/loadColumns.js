export const loadColumns = [
  { id: 'type',
    label: 'Load Type',
    align: 'center',
    numeric: false
  },
  { id: 'status', // should generate scheduled, live, completed based on the start and end times
    label: 'Status',
    align: 'center',
    numeric: false
  },
  {
    id: 'pickupDate',
    label: 'Start',
    align: 'center',
    numeric: false
  },
  {
    id: 'pickupLocation',
    label: 'Origin',
    align: 'center',
    numeric: false
  },
  {
    id: 'dropoffDate',
    label: 'End',
    align: 'center',
    numeric: false
  },
  {
    id: 'dropoffLocation',
    label: 'Destination',
    align: 'center',
    numeric: false
  },
  {
    id: 'rate',
    label: 'Rate',
    align: 'center',
    numeric: true
  },
  {
    id: 'broker',
    label: 'Broker',
    align: 'center',
    numeric: false
  },
  {
    id: 'user',
    label: 'User',
    align: 'center',
    numeric: false
  },
  // {
  //   id: 'notes',
  //   label: 'Notes',
  //   align: 'center'
  // },
  {
    id: 'edit',
    label: '',
    align: 'center',
    numeric: false
  },
]
