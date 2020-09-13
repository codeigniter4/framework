export const brokerColumns = [
  { id: 'name',
    label: 'Broker',
    align: 'center',
    numeric: false
  },
  { id: 'address', // should generate scheduled, live, completed based on the start and end times
    label: 'Address',
    align: 'center',
    numeric: false
  },
  {
    id: 'phone',
    label: 'Phone',
    align: 'center',
    numeric: false
  },
  {
    id: 'contact',
    label: 'Main Contact',
    align: 'center',
    numeric: false
  },
  {
    id: 'Email',
    label: 'Main Email',
    align: 'center',
    numeric: false
  },
  {
    id: 'billingContact',
    label: 'Billing Contact',
    align: 'center',
    numeric: false
  },
  {
    id: 'billingEmail',
    label: 'Billing Email',
    align: 'center',
    numeric: true
  },
  // {
  //   id: 'quickPay',
  //   label: 'QuickPay',
  //   align: 'center',
  //   numeric: false
  // },
  {
    id: 'edit',
    label: '',
    align: 'center',
    numeric: false
  },
]
