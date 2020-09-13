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