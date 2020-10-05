import React, { useState } from 'react';
import Form from '@rjsf/material-ui';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { JSONSchema, UISchema } from '../../constants/Schemas/load';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import FileUploader from '../../components/FileUploader/';
import { get, getType } from '../../services/';
import { generateInvoiceItems } from '../../utils/generateInvoice';
import { paperStyles } from '../../styles/paper'
import './index.scss';



const getAllBrokers = () => {
  const response = get('brokers');
  return response;
}

const getAllDrivers = () => {
  const response = getType('employees', 'driver');
  return response;
}

const getAllDispatch = () => {
  const response = getType('employees', 'dispatch');
  return response;
}

const getAllUsers = () => {
  const response = get('users');
  return response;
}

const getAllTractors = () => {
  const response = getType('equipment', 'tractor');
  return response;
}

const getAllTrailers = () => {
  const response = getType('equipment', 'trailer');
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
    formData[field] = formData[field] && formData[field] !== "0";
  })

  fields_int.map(field => {
    formData[field] = parseInt(formData[field])
  })

  Object.keys(formData).map(item => {
    if(formData[item] === null) {
      formData[item] = '';
    }
  })
  return formData
}



function LoadForm(props) {
  const classes = paperStyles();
  const table = 'loads';
  const { history, match } = props;
  const [brokers, setBrokers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [dispatch, setDispatch] = useState([]);
  const [users, setUsers] = useState([]);
  const [tractors, setTractors] = useState([]);
  const [trailers, setTrailers] = useState([]);
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

          if(load.file) {
            const parts = load.file.split(';');
            const file = parts[1].split('=')[1];
            load.ratecon = file;
            console.log('file: ', file);
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
          getAllDispatch().then(data => {
            setDispatch(data)
          })
          getAllUsers().then(data => {
            setUsers(data)
          })
          getAllTractors().then(data => {
            setTractors(data);
          })
          getAllTrailers().then(data => {
            setTrailers(data);
          })

        }

        const handleLockToggle = (e) => {
          e.preventDefault();
          setdisabled(!disabled)
        }

        const updatedSchema = {
          ...addItemsToSchema(JSONSchema, brokers, 'broker', 'name'),
          ...addItemsToSchema(JSONSchema, drivers, 'driver', 'lastname'),
          ...addItemsToSchema(JSONSchema, dispatch, 'user', 'lastname'),
          ...addItemsToSchema(JSONSchema, tractors, 'tractor', 'unit_num'),
          ...addItemsToSchema(JSONSchema, trailers, 'trailer', 'unit_num')
        }

        return (
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
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
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div className="AssetManager">
                    <FileUploader/>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </React.Fragment>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}

export default LoadForm;
