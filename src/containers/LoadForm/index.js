import React, { useState } from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema, UISchema } from '../../constants/Schemas/load';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import './index.scss';
import { get } from '../../services/';

const getAllBrokers = () => {
  const response = get('brokers');
  return response;
}

const addBrokersToSchema = (schema, brokers) => {
  const { broker } = schema.properties;
  const updatedSchema = {...schema,
   properties: {
     ...schema.properties,
     }
  }
  broker.enum = []
  broker.enumNames = []
  brokers.map(b => {
    broker.enum.push(b.id);
    broker.enumNames.push(b.name);
  });
  updatedSchema.broker = {...broker};

  return updatedSchema
}

const formatLoadData = (formData) => {
  const fields = ['deadHead', 'loadedMiles', 'rate', 'weight', 'detentionPay', 'layoverPay', 'quickPayPercentage', 'lumper'];

  fields.map(field => {
    formData[field] = parseInt(formData[field])
  })
  return formData
}


function LoadForm(props) {
  const table = 'loads';
  const { history, match } = props;
  const [brokers, setBrokers] = useState([]);
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const { record, saveRecord, getRecord } = context;
        const recordId = match.params.id;
        const saveLoad = (load) => {
          saveRecord(table, load).then( data => {
            history.push(`/vgdt-admin/${table}`);
          })
        }

        if(!record.id) {
          getRecord(table, recordId);
          getAllBrokers().then(data => {
            setBrokers(data)
          })
        }

        return (
          <div className="Load_Form">
            <Form
              schema={addBrokersToSchema(JSONSchema, brokers)}
              uiSchema={UISchema}
              formData={formatLoadData(record)}
              onSubmit={(data) => saveLoad(data.formData)}>
            </Form>
          </div>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}

export default LoadForm;
