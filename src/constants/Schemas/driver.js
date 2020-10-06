export const JSONSchema = {
  "title": "Driver Profile",
  "description": "",
  "type": "object",
  "required": ['firstname',
  'lastname', 'hire_date',
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
    // "position": {
    //   "title": "Position",
    //   "type": "string",
    //   "enum": [
    //     "driver"
    //   ],
    //   "enumNames": [
    //     "Driver"
    //   ],
    //   "default": "driver"
    // },
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


export const formData = {};

export const UISchema = {}
