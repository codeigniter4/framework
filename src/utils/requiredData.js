export const requiredData = {
  loads: [
    {
      type: 'broker',
      table: 'brokers',
      field: 'name'
    },
    {
      type: 'user',
      table: 'dispatch',
      field: 'lastname'
    },
    {
      type: 'driver',
      table: 'driver',
      field: 'lastname'
    },
    {
      type: 'tractor',
      table: 'tractor',
      field: 'unit_num'
    },
    {
      type: 'trailer',
      table: 'trailer',
      field: 'unit_num'
    }
  ]
}
