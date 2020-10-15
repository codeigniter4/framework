export const UsersJSONSchema = {
  "title": "User Details",
  "description": "",
  "type": "object",
  "required": ["firstname", "lastname", "username", "password"],
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
    "username": {
      "type": "string",
      "title": "User Name",
      "default": ""
    },
    "password": {
      "type": "string",
      "title": "Password",
      "default": ""
    },
    "email": {
      "type": "string",
      "title": "Email",
      "default": ""
    },
    "role": {
      "title": "Role",
      "type": "string",
      "enum": [
        "admin",
        "user"
      ],
      "enumNames": [
        "Admin",
        "User"
      ],
      "default": "admin"
    },
    "company": {
      "type": "string",
      "title": "Company",
      "default": ""
    }
  }
}

export const UsersFormData = {
  "firstname": "",
  "lastname": "",
  "username": "",
  "password": "noneed",
  "email": "",
  "role": "admin",
  "company": "",
  "user": "select",
  "status": "Planning",
  "type": "1",
  "broker": "",
  "pickupLocation": "",
  "pickupDate": "",
  "dropoffLocation": "",
  "dropoffDate": "",
  "deadHead": 0,
  "loadedMiles": 500,
  "rate": 1500,
  "weight": "",
  "cargo": "",
  "driver": "",
  "tractor": "",
  "trailer": "",
  "detentionPay": 0,
  "layoverPay": 0,
  "lumper": 0,
  "loadNumber": "",
  "notes": "",
  "tonu": "false",
  "ratecon": "",
  "unit_num": "",
  "sub_type": "",
  "year": "",
  "make": "",
  "model": "",
  "vin": "",
  "irp": "",
  "unladen_wt": "",
  "phone_number": "",
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
  "bio": "Roundhouse kicking asses since 1940"
};

export const UsersUISchema = {
  "password": {
    "ui:widget": "password"
  }
}
