import { INVOICE_DATES } from '../constants/';

export const get = async (type) => {
  const response = await fetch(`http://vanguard-trucking.com/api/${type}`)
  const json = await response.json();
  return json;
}


export const getByID = async (type, id) => {
  const response = await fetch(`http://vanguard-trucking.com/api/${type}/id/${id}`);
  const json = await response.json();
  return json;
}

export const save = async (type, item) => {
  const response = await fetch(`http://vanguard-trucking.com/api/${type}`, {
    method: 'post',
    body: JSON.stringify(item)
  })
  const json = await response.json();
  if(json.id) {
    return json;
  }else {
    return json[json.length - 1]
  }
}


export const deleteById = async (type, id) => {
  const response = await fetch(`http://vanguard-trucking.com/api/${type}/delete/${id}`, {
    method: 'post'
  });
  const json = await response.json();
  return json;
}

const formatItems = (items) => {
  const records = INVOICE_DATES.map(field => {
    return items.map(item => {
      item[field] = new Date(item[field]).toLocaleDateString()
      return item;
    })
  })
  return records;
}

export const exportToCSV = async (type, items) => {
  const records = formatItems(items);
  const response = await fetch(`http://vanguard-trucking.com/api/utils/export`, {
    method: 'post',
    body: JSON.stringify(items)
  })
  // const csv = await response.blob().then(blob => {
  //   const file = window.URL.createObjectURL(blob);
  //   const encodedUri = encodeURI(file)
  //   window.location.assign(encodedUri);
  // });
  const csv = await response.text()
  .then(text => {
    console.log(response);
    window.open("data:text/csv;charset=utf-8," + escape(text), "_blank", true)
  });
  return csv;
}
