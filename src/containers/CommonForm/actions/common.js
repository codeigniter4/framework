export const getCommonActions = (context, table, history) => {
  const { saveRecord } = context;
  return {
    handleSave: (record) => {
      saveRecord(table, record).then( data => {
        history.goBack();
        return data
      })
    },
    handleChange: (data) => {
    },
    handleBack: () => {
      history.goBack()
    }
  }
}
