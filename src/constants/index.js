

export const LOAD_MODEL = {
  "type": "Van",
  "status": "Planning",
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
  "user": "",
  "lumper": "",
  "loadNumber": "",
  "tonu": "false",
  "driver": "",
  "tractor": "",
  "trailer": "",
  "ratecon": ""
}


export const LOAD_STATUS = [
  {
    type: 'none',
    label: 'Select Status',
    description: ''
  },
  {
    type: 'planning',
    label: 'Planning',
    description: ''
  },
  {
    type: 'scheduled',
    label: 'Scheduled',
    description: 'Ready for pick up.'
  },
  {
    type: 'live',
    label: 'Live',
    description: 'At the Reciever'
  },
  {
    type: 'completed',
    label: 'Completed',
    description: 'Completed Delivery'
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
  "quickPayPercentage": "0",
  "paymentTerms": "30",
  "detentionRate": "50",
  "tonuFee": "250"
}

export const DISPATCH_MODEL = {
    "firstname": "",
    "lastname": "",
    "position": "dispatch",
    "title": "Dispather",
    "employer": "",
    "employment": "",
    "pay_structure": "",
    "compensation": "",
    "phone_number": "",
    "email": "",
    "address": "",
    "city": "",
    "state": "",
    "zip": "",
    "gender": "",
    "dob": "",
    "hire_date": "",
    "cdl_num": "",
    "cdl_state": "",
    "cdl_exp": "",
    "med_cert_exp": ""
}

export const EQUIPMENT_MODEL = {
  "unit_num": "",
  "type": "",
  "sub_type": "",
  "year": "",
  "make": "",
  "model": "",
  "vin": "",
  "plate": "",
  "irp": "",
  "unladen_wt": "",
}


export const USER_MODEL = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "",
  company: "",
  create_datetime: "",
  last_login: "",
  active: "",
  status: ""
}

export const DRIVER_MODEL = {
    "firstname": "",
    "lastname": "",
    "position": "driver",
    "title": "Driver",
    "employer": "",
    "employment": "",
    "pay_structure": "",
    "compensation": "",
    "phone_number": "",
    "email": "",
    "address": "",
    "city": "",
    "state": "",
    "zip": "",
    "gender": "",
    "dob": "",
    "hire_date": "",
    "cdl_num": "",
    "cdl_state": "",
    "cdl_exp": "",
    "med_cert_exp": ""
}

export const INVOICE_MODEL = {
    "*InvoiceNo": "", // 2018 +
    "*Customer": "", // Broker Name
    "BillingAddress": "", // Broker
    "CustomerEmail": "", // Broker
    "ServiceDate": "", // On Drop Load
    "*InvoiceDate": "", // On Completed Load
    "*DueDate": "", // *InvoiceDate + Terms
    "Terms": "", // Broker
    "ItemDescription": "", // Load Origin - Destination
    "ProductService": "", // DETENTION, LUMPER CHARGE, QUICKPAY, TONU
    "ItemQuantity": "1",
    "ItemRate": "", // rate - qp fee + detentionPay + layoverPay || TONU charge || lumper
    "*ItemAmount": ""
}

export const INVOICE_DATES = [
  "ServiceDate", "*InvoiceDate", "*DueDate"
]
