export const getDriverRowData = (rows, actions, editButton) => {
  return rows.map(row => {
    const newRow = {...row};
    newRow.edit = editButton(row.id, actions);
    newRow.name = `${row.firstname} ${row.lastname}`;
    return newRow;
  })
}
