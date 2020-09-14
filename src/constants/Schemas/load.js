export const JSONSchema = {
  "title": "",
  "description": "",
  "type": "object",
  "required": [],
  "properties": {
    "user": {
      "title": "Dispatch",
      "type": "string",
      "enum": [
        "select",
        "bigDuro",
        "Dujon",
        "KayDee",
        "Precious",
        "Natarlie"
      ],
      "enumNames": [
        "select",
        "bigDuro",
        "Dujon",
        "KayDee",
        "Precious",
        "Natarlie"
      ],
      "default": "select"
    },
    "status": {
      "title": "Status",
      "type": "string",
      "enum": [
        "Planning",
        "Scheduled",
        "Live",
        "Completed"
      ],
      "enumNames": [
        "Planning",
        "Scheduled",
        "Live",
        "Completed"
      ],
      "default": "Planning"
    },
    "type": {
      "title": "Type",
      "type": "string",
      "enum": [
        "PO",
        "Van",
        "Reefer"
      ],
      "enumNames": [
        "PO",
        "Van",
        "Reefer"
      ],
      "default": "Van"
    },
    "broker": {
      "title": "Broker",
      "type": "string",
      "enum": [""],
      "enumNames": [""],
      "default": ""
    },
    "pickupLocation": {
      "type": "string",
      "title": "Origin",
      "default": ""
    },
    "pickupDate": {
      "title": "Pickup",
      "type": "string",
      "format": "date-time",
      "default": ""
    },
    "dropoffLocation": {
      "type": "string",
      "title": "Destination",
      "default": ""
    },
    "dropoffDate": {
      "title": "Dropoff",
      "type": "string",
      "format": "date-time",
      "default": ""
    },
    "deadHead": {
      "title": "DeadHead",
      "type": "number",
      "default": 0
    },
    "loadedMiles": {
      "title": "Loaded Miles",
      "type": "number",
      "default": 500
    },
    "rate": {
      "title": "Rate",
      "type": "number",
      "default": 1500
    },
    "weight": {
      "title": "Weight",
      "type": "number",
      "default": ""
    },
    "cargo": {
      "title": "Cargo",
      "type": "string",
      "default": ""
    },
    "driver": {
      "title": "Driver",
      "type": "string",
      "enum": ["Ben"],
      "enumNames": ["Ben"],
      "default": ""
    },
    "detentionPay": {
      "title": "Detention hrs",
      "type": "number",
      "default": 0
    },
    "layoverPay": {
      "title": "Layover hrs",
      "type": "number",
      "default": 0
    },
    "notes": {
      "title": "Notes",
      "type": "string",
      "default": ""
    }
  }
}


export const formData = {};

export const UISchema = {
  // "pickupDate": {
  //   "ui:widget": "alt-datetime",
  //   "ui:options": {
  //     "yearsRange": [
  //       1980,
  //       2030
  //     ]
  //   }
  // }
}
