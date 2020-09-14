

export const LOAD_MODEL = {
  "type": "Van",
  "status": "",
  "pickupDate": "",
  "dropoffDate": "",
  "pickupLocation": "",
  "dropoffLocation": "",
  "loadedMiles": "",
  "deadHead": "",
  "weight": "",
  "cargo": "",
  "rate": "",
  "broker": "",
  "detentionPay": "",
  "layoverPay": "",
  "notes": "",
  "user": ""
}


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


export const BROKER_MODEL = {
  "name": "",
  "address": "",
  "phone": "",
  "contact": "",
  "Email": "",
  "billingContact": "",
  "billingEmail": "",
  "quickPay": true,
  "quickPayPercentage": "0"
}
