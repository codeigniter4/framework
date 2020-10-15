export const invoices = [
  { id: '*InvoiceNo',
    label: 'Invoice',
    align: 'center',
    numeric: false
  },
  {
    id: 'ServiceDate',
    label: 'Service Date',
    align: 'center',
    numeric: false
  },
  { id: '*Customer', // should generate scheduled, live, completed based on the start and end times
    label: 'Customer',
    align: 'center',
    numeric: false
  },
  {
    id: 'ItemDescription',
    label: 'Description',
    align: 'center',
    numeric: false
  },
  {
    id: 'CustomerEmail',
    label: 'Email',
    align: 'center',
    numeric: false
  },
  {
    id: 'ProductService',
    label: 'Product Service',
    align: 'center',
    numeric: false
  }
]
