import React, { useState } from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema, UISchema } from '../../constants/Schemas/load';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import { get } from '../../services/';
import { generateInvoiceItems } from '../../utils/generateInvoice';
import './index.scss';

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
  const fields_boolean = ['tonu'];
  const fields_int = ['deadHead', 'loadedMiles', 'rate', 'weight', 'detentionPay', 'layoverPay', 'quickPayPercentage', 'lumper'];

  fields_boolean.map(field => {
    formData[field] = formData[field] !== "0" && formData[field] > 0;
  })

  fields_int.map(field => {
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

        const handleChange = (data) => {

          if(record.status !== "Billed" && data.formData.status === "Billed") {
            const load = data.formData;
            let broker = {};

            brokers.map(item => {
              if(item.id === load.broker) {
                broker = {...item}
              }
            })

            const invoiceItems = generateInvoiceItems(load, broker);
            console.log('Invoice: ', invoiceItems);
          }
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
              onSubmit={(data) => saveLoad(data.formData)}
              onChange={handleChange}>
            </Form>
          </div>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}

export default LoadForm;
