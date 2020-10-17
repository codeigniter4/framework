export const getCommonActions = (context, table, db, history, filterFields) => {
  const { deleteRecord, filterRecords, setTableData, getAllRecords } = context;
  const store = db || table;
  const refreshData = (store) => {
    getAllRecords(store).then(data => {
      setTableData(store, data);
      return data
    });
  }
  return {
      handleClick: (id) => {
        history.push(`${store}/${id}`);
      },
      handleChange: (e) => {
        e.preventDefault();
        const fields = filterFields;
        filterRecords(store, fields, e.target.value)
      },
      handleAdd: () => {
        history.push(`${store}/add`);
      },
      handleRefresh: false,
      handleDelete: (ids) => {
        deleteRecord(table, ids).then(data => {
          refreshData(store)
        });
      },
      handleExport: false
    }
}
