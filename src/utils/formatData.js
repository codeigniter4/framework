export const formatData = (table, formData) => {
  const formattedFields = {
    brokers: {
      fields_boolean: ['quickPay'],
      fields_int: ['paymentTerms', 'detentionRate', 'tonuFee']
    },
    loads: {
      fields_boolean: ['tonu'],
      fields_int: ['deadHead', 'loadedMiles', 'rate', 'weight', 'detentionPay', 'layoverPay', 'quickPayPercentage', 'lumper']
    }
  };

  if (formattedFields[table]) {
    formattedFields[table].fields_boolean.map((field) => {
      formData[field] = formData[field] !== "0" && formData[field] > 0;
      return false;
    })

    formattedFields[table].fields_int.map((field) => {
      formData[field] = Math.round(formData[field])
      return false;
    })
  }

  Object.keys(formData).map(item => {
    if(formData[item] === null) {
      formData[item] = '';
    }
    return item
  })

  return formData;
}
