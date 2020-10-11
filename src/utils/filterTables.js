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
