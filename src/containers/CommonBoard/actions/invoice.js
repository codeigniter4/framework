import React from 'react';
import { JsonToCsv, useJsonToCsv } from 'react-json-csv';

const getInvoiceItemsWithIds = (ids, records) => {

  const idsToDelete = [];
  const invoiceId = [];
  ids.map(id => {
    records.filter(record => {
      if(record.id === id) {
        invoiceId.push(record['*InvoiceNo'])
      }
    return record
    })
  return id
  })
  invoiceId.map(id => {
    records.map(record => {
      if(record['*InvoiceNo'] === id) {
        idsToDelete.push(record.id)
      }
      return record
    })
    return id
  })

  return idsToDelete;
}


export const getInvoiceActions = (context, table, history, filterFields) => {
  const { tableData, deleteRecord, getAllRecords, exportRecordToCSV, filterRecords, setTableData} = context;
  const refreshData = (store) => {
    getAllRecords(store).then(data => {
      setTableData(store, data);
      return data
    });
  }
  return {
    handleAdd: false,
    handleDelete: (ids) => {
      const idsToDelete = getInvoiceItemsWithIds(ids, tableData[table]);
      deleteRecord(table, idsToDelete).then(data => {
        refreshData(table)
      });
    },
    handleChange: (e) => {
      const fields = filterFields;
      filterRecords(table, fields, e.target.value)
    },
    handleExport: (ids) => {
      const idsToExport = getInvoiceItemsWithIds(ids, tableData[table]);
      const recordsToExport = tableData[table].filter(record => {
        return idsToExport.includes(record.id);
      }).reverse()

      // exportRecordToCSV(table, recordsToExport).then(data => {
      //   console.log(data);
      // }).catch(e => {
      //   console.log(e);
      // })
      const { saveAsCsv } = useJsonToCsv();
      const filename = 'Csv-file',
        fields = {
          "index": "Index",
          "guid": "GUID"
        },
        style = {
          padding: "5px"
        },
        data = [
          { index: 0, guid: 'asdf231234'},
          { index: 1, guid: 'wetr2343af'}
        ],
        text = "Convert Json to Csv";

      return (
        <React.Fragment>
          <JsonToCsv
            data={data}
            filename={filename}
            fields={fields}
            style={style}
            text={text}
          />
          <button onClick={saveAsCsv({ data, fields, filename })}>
            useJsonToCsv
          </button>
        </React.Fragment>
      )
    }
  }
}
