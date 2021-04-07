import { navigation } from '../components/Navigator/menuItems';

const tables = () => {
  return navigation.map(item => {
    return {
      route: item.route,
      name: item.type || item.table
    }
  })
}

export const filterTables = (table, position) => tables().filter(item => {
  if (table.field) {
    item.field = table.field
    item.alias = table.type
  }
  return item.name === table.table || item.name === position;
})



export const filterRecords = (records, fields, searchTerm) => {
  const filteredRecords = [];
  const cacheIDs = [];
  if(fields.length) {
    const results = fields.map(field => {
      return records.filter(record => record[field] && (record[field].toLowerCase().includes(searchTerm.toLowerCase())));
    })
    results.map(result => {
      result.map(rec => {
        // avoid pushing rec twice
        if(!cacheIDs.includes(rec.id)) {
          filteredRecords.push(rec)
          cacheIDs.push(rec.id)
        }
        return rec
      })
      return result
    })
  }
  console.log('filteredRecords:: ', filteredRecords);
  return filteredRecords
}
