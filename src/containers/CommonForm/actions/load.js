export const getLoadActions = (context, table, history) => {
  const { record, saveRecord, setRecord } = context;
  return {
    handleSave: (record) => {
      console.log(record.file);
      return new Promise((resolve, reject) => {
        saveRecord(table, record).then( data => {
          history.goBack();
          resolve(data);
        })
      })
    },
    handleChange: (data, disabled, setdisabled) => {
      if(data.status && data.status === "Billed" && !disabled) {
        setRecord(table, data);
        setdisabled(true);
      }
    },
    handleBack: () => {
      history.goBack()
    },
    hasToggle: true
  }
}
