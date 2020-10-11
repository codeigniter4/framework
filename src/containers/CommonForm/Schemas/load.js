export const LoadJSONSchema = {
  "title": "Load Details",
  "description": "",
  "type": "object",
  "required": [
    "type",
    "status",
    "pickupDate",
    "dropoffDate",
    "pickupLocation",
    "dropoffLocation",
    "loadedMiles",
    "deadHead",
    "rate",
    "user",
    "driver",
    "broker"
  ],
  "properties": {
    "user": {
      "title": "Dispatch",
      "type": "string",
      "enum": ["select"],
      "enumNames": ["Select"],
      "default": "select"
    },
    "status": {
      "title": "Status",
      "type": "string",
      "enum": [
        "Planning",
        "Scheduled",
        "Live",
        "Completed",
        "Billed"
      ],
      "enumNames": [
        "Planning",
        "Scheduled",
        "Live",
        "Completed",
        "Billed"
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
      "enum": ["select"],
      "enumNames": ["Select"],
      "default": ""
    },
    "pickupLocation": {
      "type": "string",
      "title": "Origin",
      "description": "Pickup Location",
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
      "enum": ["select"],
      "enumNames": ["Select"],
      "default": ""
    },
    "tractor": {
      "title": "Tractor",
      "type": "string",
      "enum": ["select"],
      "enumNames": ["Select"],
      "default": ""
    },
    "trailer": {
      "title": "Trailer",
      "type": "string",
      "enum": ["select"],
      "enumNames": ["Select"],
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
    "lumper": {
      "title": "Lumper Fee",
      "type": "number",
      "default": 0
    },
    "loadNumber": {
      "title": "Load#",
      "type": "string",
      "default": ""
    },
    "notes": {
      "title": "Notes",
      "type": "string",
      "default": ""
    },
    "tonu": {
      "type": "boolean",
      "title": "TONU",
      "default": "false"
    },
    "ratecon": {
      "type": "string",
      "title": "Rate Contract",
      "default": ""
    },
    "file": {
      "type": "string",
      "format": "data-url",
      "title": "Rate Contract"
    }
  }
}

export const LoadFormData = {
  "user": "select",
  "status": "Planning",
  "type": "Van",
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
  "ratecon": ""
};

export const LoadUISchema = {}
