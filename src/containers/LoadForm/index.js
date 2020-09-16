import React, { useState } from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema, UISchema } from '../../constants/Schemas/load';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import { get } from '../../services/';
import { generateInvoiceItems } from '../../utils/generateInvoice';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
  const [invoices, setinvoices] = useState([]);
  const [disabled, setdisabled] = useState(false);
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const { record, saveRecord, getRecord, setRecord } = context;
        const recordId = match.params.id;
        const saveLoad = (load) => {

          if(invoices.length) {
            invoices.map(invoice => {
              saveRecord('invoices', invoice)
            })
          }

          saveRecord(table, load).then( data => {
            history.push(`/vgdt-admin/${table}`);
          })

        }

        const handleChange = (data) => {
          const load = data.formData;
          let broker = {};
          brokers.map(item => {
            if(item.id === load.broker) {
              broker = {...item}
            }
          })

          if(record.status && record.status !== "Billed" && data.formData.status === "Billed" && !disabled) {
            const invoiceItems = generateInvoiceItems(load, broker);
            setdisabled(!disabled);
            setRecord(load);
            setinvoices(invoiceItems);
          }
        }

        if(!record.id) {
          getRecord(table, recordId).then(data => {
            const isBilled = data.status === "Billed";
            setdisabled(isBilled)
          });
          getAllBrokers().then(data => {
            setBrokers(data)
          })
        }

        const handleLockToggle = (e) => {
          e.preventDefault();
          setdisabled(!disabled)
        }

        return (
          <div className="Load_Form">
            <div className="Load_Form_Lock" onClick={handleLockToggle}>
              {disabled ?
                <LockIcon/> :
                <LockOpenIcon/>
              }
            </div>
            <Form
              schema={addBrokersToSchema(JSONSchema, brokers)}
              uiSchema={UISchema}
              formData={formatLoadData(record)}
              onSubmit={(data) => saveLoad(data.formData)}
              onChange={handleChange}
              disabled={disabled}>
            </Form>
          </div>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}

export default LoadForm;
