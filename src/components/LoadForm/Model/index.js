export const LOAD_MODEL = {
  "type": "po",
  "status": "live",
  "pickupDate": "mm/dd/yyy 00:00:00",
  "dropoffDate": "mm/dd/yyy  00:00:00",
  "pickupLocation": "Springfield, OH",
  "dropoffLocation": "Atlanta, GA",
  "loadedMiles": 550,
  "deadHead": 20,
  "weight": 40,
  "cargo": "",
  "rate": "1003.00",
  "brokerId": "222",
  "detentionPay": 0,
  "layoverPay": 0,
  "notes": "Some message"
}

export const LOAD_TYPES = [
  {
    type: 'van',
    label: 'Van'
  },
  {
    type: 'po',
    label: 'Power Only'
  }
]
