import React from 'react';
import Form from '@rjsf/material-ui';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { JSONSchema, UISchema } from '../../constants/Schemas/broker';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import { paperStyles } from '../../styles/paper';
import './index.scss';

const formatData = (formData) => {
  const fields_boolean = ['quickPay'];
  const fields_int = ['paymentTerms', 'detentionRate', 'tonuFee'];

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
function BrokerForm(props) {
  const classes = paperStyles();
  const table = 'brokers';
  const { history, match } = props;
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const { record, saveRecord, getRecord} = context;
        const recordId = match.params.id;
        const saveBroker = (record) => {
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div className="broker_Form">
                  <Form
                    schema={JSONSchema}
                    uiSchema={UISchema}
                    formData={formatData(record)}
                    onSubmit={(data) => saveBroker(data.formData)}>
                  </Form>
                </div>
              </Paper>
            </Grid>
          </Grid>

        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}

export default BrokerForm;
