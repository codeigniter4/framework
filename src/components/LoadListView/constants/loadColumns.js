export const loadColumns = [
  { id: 'type',
    label: 'Type',
    align: 'center'
  },
  { id: 'status', // should generate scheduled, live, completed based on the start and end times
    label: 'Status',
    align: 'center'
  },
  {
    id: 'pickupDate',
    label: 'Start',
    format: (value) => value.toLocaleString('en-US'),
    align: 'center'
  },
  {
    id: 'pickupLocation',
    label: 'Origin',
    align: 'center'
  },
  {
    id: 'dropoffDate',
    label: 'End',
    format: (value) => value.toLocaleString('en-US'),
    align: 'center'
  },
  {
    id: 'dropoffLocation',
    label: 'Destination',
    align: 'center'
  },
  {
    id: 'deadHead',
    label: 'DeadHead',
    align: 'center'
  },
  {
    id: 'loadedMiles',
    label: 'Miles',
    align: 'center'
  },
  {
    id: 'rate',
    label: 'Rate',
    align: 'center'
  },
  {
    id: 'brokerId',
    label: 'Broker',
    align: 'center'
  },
  {
    id: 'notes',
    label: 'Notes',
    align: 'center'
  },
  {
    id: 'edit',
    label: '',
    align: 'center'
  },
]


export const load = {
  "type": "", // need list of load types in UI
  "status": "completed", // need list of status in UI
  "pickupDate": "mm/dd/yyy 00:00:00", // UI datePicker
  "dropoffDate": "mm/dd/yyy  00:00:00", // UI datePicker
  "pickupLocation": {
    "street": "",
    "city": "",
    "state": "",
    "zip": ""
  },
  "dropoffLocation": {
    "street": "",
    "city": "",
    "state": "",
    "zip": ""
  },
  "loadedMiles": 550, // generate loaded miles in UI
  "deadHead": 20,
  "weight": 40, // set in lbs
  "cargo": "", // what are we carring
  "rate": "00.00", // in $$
  "brokerId": 111, // generate from broker table
  "detentionPay": 0, // admin will set hr, for usage generate hrs * rate (rates table)
  "layoverPay": 0, // admin will set hr, for usage generate hrs * rate (rates table)
  "notes": ""
}