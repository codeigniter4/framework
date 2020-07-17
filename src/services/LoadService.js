export const getLoads = () => {
  const getLoadsPromise = new Promise((resolve, reject) => {
    fetch('http://vanguard-trucking.com/api/loads')
      .then(response => response.json())
      .then(loadData => {
        resolve(loadData)
      }).catch(err => {
        console.log(err);
      })
  })
  return getLoadsPromise;
}


export const getLoadByID = (id) => {
  const getLoadByIDPromise = new Promise((resolve, reject) => {
    fetch('http://vanguard-trucking.com/api/loads/id/' + id)
      .then(response => response.json())
      .then(loadData => {
        resolve(loadData)
      }).catch(err => {
        console.log(err);
      })
  })
  return getLoadByIDPromise;
}

export const saveLoad = (load) => {
  const getLoadByIDPromise = new Promise((resolve, reject) => {
    fetch('http://vanguard-trucking.com/api/loads', {
      method: 'post',
      body: JSON.stringify(load)
    })
      .then(response => response.json())
      .then(loadData => {
        resolve(loadData[loadData.length - 1])
      }).catch(err => {
        console.log(err);
      })
  })
  return getLoadByIDPromise;
}


export const deleteLoadById = (id) => {
  const getLoadByIDPromise = new Promise((resolve, reject) => {
    fetch('http://vanguard-trucking.com/api/loads/delete/' + id, {
      method: 'post'
    })
      .then(response => response.json())
      .then(loadData => {
        resolve(loadData)
      }).catch(err => {
        console.log(err);
      })
  })
  return getLoadByIDPromise;
}
