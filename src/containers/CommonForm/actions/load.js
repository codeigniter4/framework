export const getLoadActions = (context, table, history) => {
  const { record, saveRecord, setRecord, uploadAssets } = context;
  return {
    handleSave: (record) => {
      // console.log('record: ', record.file);
      return new Promise((resolve, reject) => {
        if(record.files && record.files.length) {
          uploadAssets(table, record.files, record.id).then(data => {
            console.log('upload done!');
          })
        }
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
