export const JSONSchema = {
  "title": "Load Form",
  "description": "Fill out all required details.",
  "type": "object",
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
      ]
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
      ]
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
      ]
    },
    "pickupLocation": {
      "type": "string",
      "title": "Origin",
      "default": ""
    },
    "pickupDate": {
      "title": "Pickup",
      "type": "string",
      "format": "date-time"
    },
    "dropoffLocation": {
      "type": "string",
      "title": "Destination",
      "default": ""
    },
    "dropoffDate": {
      "title": "Dropoff",
      "type": "string",
      "format": "date-time"
    },
    "deadHead": {
      "title": "DeadHead",
      "type": "integer"
    },
    "loadedMiles": {
      "title": "Loaded Miles",
      "type": "integer"
    },
    "weight": {
      "title": "Weight",
      "type": "integer"
    },
    "cargo": {
      "title": "Cargo",
      "type": "string"
    },
    "rate": {
      "title": "Rate",
      "type": "integer"
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
      ]
    },
    "detentionPay": {
      "title": "Detention hrs",
      "type": "integer"
    },
    "layoverPay": {
      "title": "Layover hrs",
      "type": "integer"
    },
    "notes": {
      "title": "Cargo",
      "type": "string"
    }
  }
}


export const formData = {};

export const UISchema = {}
