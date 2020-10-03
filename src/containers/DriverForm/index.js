import React from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema, UISchema } from '../../constants/Schemas/driver';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import './index.scss';

const formatData = (formData) => {
  const fields_boolean = [];
  const fields_int = [];

  fields_boolean.map((field) => {
    formData[field] = formData[field] !== "0" && formData[field] > 0;
    return false;
  })

  fields_int.map((field) => {
    formData[field] = parseInt(formData[field])
    return false;
  })

  return formData;
}
function DriverForm(props) {
  const table = 'drivers';
  const { history, match } = props;
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const { record, saveRecord, getRecord} = context;
        const recordId = match.params.id;
        const saveDriver = (record) => {
          saveRecord(table, record).then( data => {
            history.push(`/vgdt-admin/${table}`);
            return data
          })
        }

        if(!record.id) {
          getRecord(table, recordId).then(data => {
            return data
          });
        }

        return (
          <div className="driver_Form">
            <Form
              schema={JSONSchema}
              uiSchema={UISchema}
              formData={formatData(record)}
              onSubmit={(data) => saveDriver(data.formData)}>
            </Form>
          </div>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}

export default DriverForm;
