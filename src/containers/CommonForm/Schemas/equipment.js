export const EquipmentJSONSchema = {
  "title": "Details",
  "description": "",
  "type": "object",
  "required": ["unit_num",
  "type", "vin", "irp"
  ],
  "properties": {
    "unit_num": {
      "type": "string",
      "title": "Unit Number",
      "default": ""
    },
    "type": {
      "title": "Type",
      "type": "string",
      "enum": [
        "tractor",
        "trailer"
      ],
      "enumNames": [
        "Tractor",
        "Trailer"
      ],
      "default": "1"
    },
    "sub_type": {
      "type": "string",
      "title": "Sub Type",
      "default": ""
    },
    "year": {
      "type": "string",
      "title": "Year",
      "default": ""
    },
    "make": {
      "type": "string",
      "title": "Make",
      "default": ""
    },
    "model": {
      "type": "string",
      "title": "Model",
      "default": ""
    },
    "vin": {
      "type": "string",
      "title": "Vin",
      "default": ""
    },
    "plate": {
      "type": "string",
      "title": "Plate",
      "default": ""
    },
    "irp": {
      "type": "string",
      "title": "IRP",
      "default": ""
    },
    "unladen_wt": {
      "type": "string",
      "title": "unladen_wt",
      "default": ""
    }
  }
}

export const EquipmentFormData = {
  "unit_num": "",
  "type": "1",
  "sub_type": "",
  "year": "",
  "make": "",
  "model": "",
  "vin": "",
  "irp": "",
  "unladen_wt": "",
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

export const EquipmentUISchema = {}
