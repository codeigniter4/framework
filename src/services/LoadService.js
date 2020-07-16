export const getLoads = () => {
  const getLoadsPromise = new Promise((resolve, reject) => {
    fetch('http://localhost:8888/public/loads')
      .then(response => response.json())
      .then(loadData => {
        console.log(loadData);
        resolve(loadData)
      }).catch(err => {
        console.log(err);
      })
  })
  return getLoadsPromise;
}
