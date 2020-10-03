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

const getAllDrivers = () => {
  const response = get('drivers');
  return response;
}

const getAllUsers = () => {
  const response = get('users');
  return response;
}

const getAllEquipment = () => {
  const response = get('equipment');
  return response;
}

const addItemsToSchema = (schema, items, item, field) => {
  const newItem = schema.properties[item];
  const updatedSchema = {...schema,
   properties: {
     ...schema.properties,
     }
  }
  newItem.enum = []
  newItem.enumNames = []
  items.map(b => {
    newItem.enum.push(b.id);
    newItem.enumNames.push(b[field]);
  });
  updatedSchema[item] = {...newItem};

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
  const [drivers, setDrivers] = useState([]);
  const [users, setUsers] = useState([]);
  const [equipment, setEquipment] = useState([]);
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
          getAllDrivers().then(data => {
            setDrivers(data)
          })
          getAllUsers().then(data => {
            setUsers(data)
          })
          getAllEquipment().then(data => {
            setEquipment(data);
          })

        }

        const handleLockToggle = (e) => {
          e.preventDefault();
          setdisabled(!disabled)
        }

        const updatedSchema = {
          ...addItemsToSchema(JSONSchema, brokers, 'broker', 'name'),
          ...addItemsToSchema(JSONSchema, drivers, 'driver', 'lastname'),
          ...addItemsToSchema(JSONSchema, users, 'user', 'username'),
          ...addItemsToSchema(JSONSchema, equipment, 'tractor', 'unit_num'),
          ...addItemsToSchema(JSONSchema, equipment, 'trailer', 'unit_num')
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
              schema={updatedSchema}
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
