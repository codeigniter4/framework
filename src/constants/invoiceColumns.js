export const invoiceColumns = [
  { id: 'InvoiceNo',
    label: 'Invoice',
    align: 'center',
    numeric: false
  },
  {
    id: 'ItemDescription',
    label: '',
    align: 'center',
    numeric: false
  },
  { id: 'Customer', // should generate scheduled, live, completed based on the start and end times
    label: 'Customer',
    align: 'center',
    numeric: false
  },
  {
    id: 'BillingAddress',
    label: 'Billing Address',
    align: 'center',
    numeric: false
  },
  {
    id: 'CustomerEmail',
    label: 'CustomerEmail',
    align: 'center',
    numeric: false
  },
  {
    id: 'ServiceDate',
    label: 'Service Date',
    align: 'center',
    numeric: false
  },
  {
    id: 'InvoiceDate',
    label: 'Invoice Date',
    align: 'center',
    numeric: false
  }
]
