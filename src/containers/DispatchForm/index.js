import React from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema, UISchema } from '../../constants/Schemas/dispatch';
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
function DispatchForm(props) {
  const table = 'employees';
  const route = 'dispatch';
  const { history, match } = props;
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const { record, saveRecord, getRecord} = context;
        const recordId = match.params.id;
        const saveDispatch = (record) => {
          saveRecord(table, record).then( data => {
            history.push(`/vgdt-admin/${route}`);
            return data
          })
        }

        if(!record.id) {
          getRecord(table, recordId).then(data => {
            return data
          });
        }

        return (
          <div className="dispatch_Form">
            <Form
              schema={JSONSchema}
              uiSchema={UISchema}
              formData={formatData(record)}
              onSubmit={(data) => saveDispatch(data.formData)}>
            </Form>
          </div>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}

export default DispatchForm;
