export const getLoads = async () => {
  const response = await fetch('http://vanguard-trucking.com/api/loads')
  const json = await response.json();
  return json;
}


export const getLoadByID = async (id) => {
  const response = await fetch('http://vanguard-trucking.com/api/loads/id/' + id);
  const json = await response.json();
  return json;
}

export const saveLoad = async (load) => {
  const response = await fetch('http://vanguard-trucking.com/api/loads', {
    method: 'post',
    body: JSON.stringify(load)
  })
  const json = await response.json();
  if(json.id) {
    return json;
  }else {
    return json[json.length - 1]
  }
}


export const deleteLoadById = async (id) => {
  const response = await fetch('http://vanguard-trucking.com/api/loads/delete/' + id, {
    method: 'post'
  });
  const json = await response.json();
  return json;
}
