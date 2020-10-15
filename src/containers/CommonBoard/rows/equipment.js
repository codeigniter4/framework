export const getEquipmentRowData = (rows, actions, editButton) => {
  return rows.map(row => {
    const newRow = {...row};
    newRow.edit = editButton(row.id, actions);
    newRow.description = `${row.year} ${row.make} ${row.model} | ${row.sub_type}`;
    return newRow;
  })
}
