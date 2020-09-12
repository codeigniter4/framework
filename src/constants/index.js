const date = new Date();
date.setMilliseconds(0);
const newDate = date.toISOString();

export const LOAD_MODEL = {
  "type": "foo",
  "status": "foo",
  "pickupDate": newDate,
  "dropoffDate": newDate,
  "pickupLocation": "",
  "dropoffLocation": "",
  "loadedMiles": "",
  "deadHead": "",
  "weight": "",
  "cargo": "",
  "rate": "",
  "broker": "foo",
  "detentionPay": "",
  "layoverPay": "",
  "notes": "",
  "user": "foo"
}

export const LOAD_TYPES = [
  {
    type: 'none',
    label: 'N/A',
    alias: 'Select Type'
  },
  {
    type: 'van',
    label: 'Van',
    alias: `53' Dry Van`
  },
  {
    type: 'po',
    label: 'PO',
    alias: 'Power Only'
  }
]

export const LOAD_STATUS = [
  {
    type: 'none',
    label: 'Select Status',
  },
  {
    type: 'planning',
    label: 'Planning',
  },
  {
    type: 'scheduled',
    label: 'Scheduled'
  },
  {
    type: 'live',
    label: 'Live'
  },
  {
    type: 'completed',
    label: 'Completed'
  }
];

export const VGDT_USERS = [
  {
    id: '1',
    type: 'super',
    label: 'bigDuro',
    fname: 'Darryl',
    lname: 'Crockett',
    avatar: ''
  },
  {
    id: '2',
    type: 'admin',
    label: 'Precios',
    fname: 'Precions',
    lname: 'Crockett',
    avatar: ''
  },
  {
    id: '3',
    type: 'admin',
    label: 'Dujon',
    fname: 'Dujon',
    lname: 'Criswick',
    avatar: ''
  },
  {
    id: '4',
    type: 'admin',
    label: 'Natarlie',
    fname: 'Natarlie',
    lname: 'Criswick',
    avatar: ''
  },
  {
    id: '5',
    type: 'super',
    label: 'KayDee',
    fname: 'Kyle',
    lname: 'Davis',
    avatar: ''
  }
];
