export const getCommonActions = (context, table, db, history, filterFields) => {
  const { deleteRecord, filterRecords, setTableData } = context;
  const store = db || table;
  return {
      handleClick: (id) => {
        history.push(`${store}/${id}`);
      },
      handleChange: (e) => {
        const fields = filterFields;
        filterRecords(table, fields, e.target.value)
      },
      handleAdd: () => {
        history.push(`${store}/add`);
      },
      handleRefresh: false,
      handleDelete: (ids) => {
        deleteRecord(table, ids).then(data => {
          setTableData(store, data);
        });
      },
      handleExport: false
    }
}
