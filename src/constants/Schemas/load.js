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
        "foo",
        "bar"
      ],
      "enumNames": [
        "Foo",
        "Bar"
      ],
      "default": "foo"
    },
    "status": {
      "title": "Status",
      "type": "string",
      "enum": [
        "foo",
        "bar"
      ],
      "enumNames": [
        "Foo",
        "Bar"
      ],
      "default": "foo"
    },
    "type": {
      "title": "Type",
      "type": "string",
      "enum": [
        "foo",
        "bar"
      ],
      "enumNames": [
        "Foo",
        "Bar"
      ],
      "default": "foo"
    },
    "broker": {
      "title": "Broker",
      "type": "string",
      "enum": [
        "foo",
        "bar"
      ],
      "enumNames": [
        "Foo",
        "Bar"
      ],
      "default": "foo"
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
      "type": "string",
      "default": "0"
    },
    "loadedMiles": {
      "title": "Loaded Miles",
      "type": "string",
      "default": "500"
    },
    "rate": {
      "title": "Rate",
      "type": "string",
      "default": ""
    },
    "weight": {
      "title": "Weight",
      "type": "string",
      "default": ""
    },
    "cargo": {
      "title": "Cargo",
      "type": "string",
      "default": ""
    },
    "detentionPay": {
      "title": "Detention hrs",
      "type": "string",
      "default": "0"
    },
    "layoverPay": {
      "title": "Layover hrs",
      "type": "string",
      "default": "0"
    },
    "notes": {
      "title": "Notes",
      "type": "string",
      "default": ""
    }
  }
}


export const formData = {};

export const UISchema = {}
