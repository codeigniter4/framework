export const getCommonActions = (context, table, history) => {
  const { saveRecord } = context;
  return {
    handleSave: (record) => {
      return new Promise((resolve, reject) => {
        saveRecord(table, record).then( data => {
          history.goBack();
          resolve(data);
        })
      })
    },
    handleChange: (data) => {
    },
    handleBack: () => {
      history.goBack()
    }
  }
}
