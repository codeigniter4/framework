export const JSONSchema = {
  "title": "Broker Profile",
  "description": "",
  "type": "object",
  "required": [],
  "properties": {
    "name": {
      "type": "string",
      "title": "Broker Name",
      "default": ""
    },
    "contact": {
      "type": "string",
      "title": "Main Contact",
      "default": ""
    },
    "address": {
      "type": "string",
      "title": "Address",
      "default": ""
    },
    "phone": {
      "type": "string",
      "title": "Phone",
      "default": ""
    },
    "Email": {
      "type": "string",
      "title": "Email",
      "default": ""
    },
    "billingContact": {
      "type": "string",
      "title": "Billing Contact",
      "default": ""
    },
    "billingEmail": {
      "type": "string",
      "title": "Billing Email",
      "default": ""
    },
    "quickPay": {
      "type": "boolean",
      "title": "QuickPay",
      "default": "true"
    },
    "quickPayPercentage": {
      "type": "string",
      "title": "QuickPay Percentage",
      "default": ""
    },
    "paymentTerms": {
      "type": "number",
      "title": "Payment Terms",
      "default": 30
    },
    "detentionRate": {
      "type": "number",
      "title": "Detention Rate",
      "default": 50
    },
    "tonuFee": {
      "type": "number",
      "title": "TONU Fee",
      "default": 250
    }
  }
}


export const formData = {};

export const UISchema = {}
