export const getCommonActions = (context, table, db, history, filterFields) => {
  const { deleteRecord, filterRecords, setTableData } = context;
  return {
      handleClick: (id) => {
        history.push(`${table}/${id}`);
      },
      handleChange: (e) => {
        const fields = filterFields;
        filterRecords(table, fields, e.target.value)
      },
      handleAdd: () => {
        history.push(`${table}/add`);
      },
      handleRefresh: false,
      handleDelete: (ids) => {
        const store = db || table;
        console.log('table, db: ', table, db);
        deleteRecord(table, ids).then(data => {
          setTableData(store, data);
        });
      },
      handleExport: false
    }
}
