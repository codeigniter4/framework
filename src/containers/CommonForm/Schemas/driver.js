export const DriverJSONSchema = {
  "title": "Profile",
  "description": "",
  "type": "object",
  "required": ["firstname",
  "lastname", "hire_date"
  ],
  "properties": {
    "firstname": {
      "type": "string",
      "title": "First Name",
      "default": ""
    },
    "lastname": {
      "type": "string",
      "title": "Last Name",
      "default": ""
    },
    "phone_number": {
      "type": "string",
      "title": "Phone Number",
      "default": ""
    },
    "email": {
      "type": "string",
      "title": "Email",
      "default": ""
    },
    "address": {
      "type": "string",
      "title": "Street Address",
      "default": ""
    },
    "city": {
      "type": "string",
      "title": "City",
      "default": ""
    },
    "state": {
      "type": "string",
      "title": "State",
      "default": ""
    },
    "zip": {
      "type": "string",
      "title": "Zip Code",
      "default": ""
    },
    "position": {
      "title": "Position",
      "type": "string",
      "enum": [
        "driver"
      ],
      "enumNames": [
        "Driver"
      ],
      "default": "driver"
    },
    "pay_structure": {
      "type": "string",
      "title": "Pay Structure",
      "default": ""
    },
    "compensation": {
      "type": "string",
      "title": "Compensation",
      "default": ""
    },
    "breakdownRate": {
      "type": "string",
      "title": "Breakdown Rate",
      "default": ""
    },
    "layoverRate": {
      "type": "string",
      "title": "Layover Rate",
      "default": ""
    },
    "detentionRate": {
      "type": "string",
      "title": "Detention Rate",
      "default": ""
    },
    "gender": {
      "title": "Gender",
      "type": "string",
      "enum": [
        "select",
        "m",
        "f"
      ],
      "enumNames": [
        "select",
        "Male",
        "Female"
      ],
      "default": "select"
    },
    "dob": {
      "title": "Date of Birth",
      "type": "string",
      "format": "date",
      "default": ""
    },
    "hire_date": {
      "title": "Hire Date",
      "type": "string",
      "format": "date",
      "default": ""
    },
    "cdl_num": {
      "type": "string",
      "title": "CDL Number",
      "default": ""
    },
    "cdl_state": {
      "type": "string",
      "title": "CDL State",
      "default": ""
    },
    "cdl_exp": {
      "title": "CDL Expiration",
      "type": "string",
      "format": "date",
      "default": ""
    },
    "med_cert_exp": {
      "title": "Med Card Expiration",
      "type": "string",
      "format": "date",
      "default": ""
    }
  }
}


export const DriverFormData = {
  "firstname": "",
  "lastname": "",
  "phone_number": "",
  "email": "",
  "address": "",
  "city": "",
  "state": "",
  "zip": "",
  "pay_structure": "",
  "compensation": "",
  "gender": "select",
  "dob": "",
  "hire_date": "",
  "name": "",
  "billingContact": "",
  "phone": "",
  "billingEmail": "",
  "contact": "",
  "Email": "",
  "quickPay": "true",
  "quickPayPercentage": "",
  "paymentTerms": 30,
  "detentionRate": 50,
  "tonuFee": 250,
  "firstName": "Chuck",
  "lastName": "Norris",
  "age": 75,
  "bio": "Roundhouse kicking asses since 1940",
  "password": "noneed"
};

export const DriverUISchema = {}
