import { getEnv } from '../config';
import { INVOICE_DATES } from '../constants/';

const env = getEnv('prod'); // local or prod

export const get = async (type) => {
  const response = await fetch(`${env}/${type}`)
  const json = await response.json();
  return json;
}

export const getType = async (table, type) => {
  const response = await fetch(`${env}/${table}/type/${type}`)
  const json = await response.json();
  return json;
}


export const getByID = async (type, id) => {
  const response = await fetch(`${env}/${type}/id/${id}`);
  const json = await response.json();
  return json;
}

export const save = async (type, item) => {
  const response = await fetch(`${env}/${type}`, {
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
  const response = await fetch(`${env}/${type}/delete/${id}`, {
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
  return records[0];
}

export const exportToCSV = async (type, items) => {
  const records = formatItems(items);
  const body = JSON.stringify(records);
  // console.log('body: ', body);
  const response = await fetch(`${env}/utils/export`, {
    method: 'post',
    body
  })
  const csv = await response.text()
  .then(text => {
    window.open("data:text/csv;charset=utf-8," + escape(text), true)
  });
  return csv;
}

export const uploadAssets = async (table, records, id) => {
  const body = {
    "metadata": {},
    "file": records[0],
  }

  const formData = new FormData();
  formData.append('file', records[0])

  console.log("records: ", records);

  // const request = new XMLHttpRequest();
  // request.open('POST', `${env}/utils/upload/${id}`);
  // request.send(formData);


  // const response = await fetch(`${env}/utils/upload/${id}`, {
  //   method: 'POST',
  //   body: JSON.stringify(body)
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data.path)
  // })
  // .catch(error => {
  //   console.error(error)
  // })
  return formData;
}
