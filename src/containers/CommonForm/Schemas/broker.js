export const BrokerJSONSchema = {
  "title": "Broker Profile",
  "description": "",
  "type": "object",
  "required": ['name', 'address', 'billingEmail', 'detentionRate', 'tonuFee', 'paymentTerms'],
  "properties": {
    "name": {
      "type": "string",
      "title": "Broker Name",
      "default": ""
    },
    "billingContact": {
      "type": "string",
      "title": "Billing Contact",
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
    "billingEmail": {
      "type": "string",
      "title": "Billing Email",
      "default": ""
    },
    "contact": {
      "type": "string",
      "title": "Alternative Contact",
      "default": ""
    },
    "Email": {
      "type": "string",
      "title": "Alternative Email",
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

export const BrokerUISchema = {}
