export const TrailerJSONSchema = {
  "title": "Trailer Details",
  "description": "",
  "type": "object",
  "required": ['unit_num',
  'type', 'vin', 'irp'
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


export const formData = {};

export const TrailerUISchema = {}
