import { config } from '../constants/'

export const getLoadData = (searchTerm) => {
  const getLoadDataPromise = new Promise((resolve, reject) => {
    // Getting loads
    fetch(`${config.devHost}public/loads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      resolve(data);
    })
  })
  return getLoadDataPromise;
}
