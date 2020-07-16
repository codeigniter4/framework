const makeColumns = (model) => {
  return [
    { id: 'name',
      label: 'Name'
    },
    { id: 'code',
      label: 'ISO\u00a0Code'
    },
    {
      id: 'population',
      label: 'Population',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      format: (value) => value.toFixed(2),
    },
  ]
}
