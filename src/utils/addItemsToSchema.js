export const addItemsToSchema = (schema, items, item, field) => {
  const newItem = {...schema};
  items.map(b => {
    if(!newItem.enum.includes(b.id)) {
      newItem.enum.push(b.id);
      newItem.enumNames.push(b[field]);
    }

    return b
  });
  return newItem
}
