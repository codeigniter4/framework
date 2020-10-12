export const getLoadActions = (context, table, history) => {
  const { record, saveRecord, setRecord } = context;
  return {
    handleSave: (record) => {
      saveRecord(table, record).then( data => {
        history.goBack();
        return data
      })
    },
    handleChange: (data, disabled, setdisabled) => {
      if(data.status && data.status === "Billed" && !disabled) {
        console.log('context: ', context);
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
