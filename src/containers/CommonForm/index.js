import React from 'react';
import Form from '@rjsf/material-ui';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import { paperStyles } from '../../styles/paper';
import { getSchemaType } from  './Schemas/';
import { navigation } from '../../components/Navigator/menuItems';
import './index.scss';

const addItemsToSchema = (schema, items, item, field) => {
  const newItem = {...schema};

  items.map(b => {
    newItem.enum.push(b.id);
    newItem.enumNames.push(b[field]);
    return b
  });

  return newItem
}


const tables = () => {
  return navigation.map(item => {
    return {
      route: item.route,
      name: item.type || item.table
    }
  })
}

const filterTables = (table, position) => tables().filter(item => {
  if (table.field) {
    item.field = table.field
    item.alias = table.type
  }
  return item.name === table.table || item.name === position;
})

const formatData = (table, formData) => {
  const formattedFields = {
    brokers: {
      fields_boolean: ['quickPay'],
      fields_int: ['paymentTerms', 'detentionRate', 'tonuFee']
    },
    loads: {
      fields_boolean: ['tonu'],
      fields_int: ['deadHead', 'loadedMiles', 'rate', 'weight', 'detentionPay', 'layoverPay', 'quickPayPercentage', 'lumper']
    }
  };

  if (formattedFields[table]) {
    formattedFields[table].fields_boolean.map((field) => {
      formData[field] = formData[field] !== "0" && formData[field] > 0;
      return false;
    })

    formattedFields[table].fields_int.map((field) => {
      formData[field] = parseInt(formData[field])
      return false;
    })
  }

  Object.keys(formData).map(item => {
    if(formData[item] === null) {
      formData[item] = '';
    }
    return item
  })

  return formData;
}

function CommonForm(props) {
  const classes = paperStyles();
  const { history, match } = props;
  const recordId = match.params.id;
  const table = match.params.table;
  const position = match.params.position;
  const schemaTyle = position || table;
  const schema = getSchemaType(schemaTyle);
  const [updatedSchema, setUpdatedSchema] = React.useState({...schema.JSONSchema});
  const [loaded, setLoaded] = React.useState(false);
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const { record, saveRecord, getRecord, getAllRecords} = context;
        const save = (record) => {
          saveRecord(table, record).then( data => {
            history.goBack();
            return data
          })
        }

        const requiredData = {
          loads: [
            {
              type: 'broker',
              table: 'brokers',
              field: 'name'
            },
            {
              type: 'user',
              table: 'dispatch',
              field: 'lastname'
            },
            {
              type: 'driver',
              table: 'driver',
              field: 'lastname'
            },
            {
              type: 'tractor',
              table: 'tractor',
              field: 'unit_num'
            },
            {
              type: 'trailer',
              table: 'trailer',
              field: 'unit_num'
            }
          ]
        }

        const refreshData = (config) => {
          const { route, alias, field } = config;
          getAllRecords(route).then(data => {
            const updated = {
              ...updatedSchema,
                properties: {
                  ...updatedSchema.properties,
                    [alias]: addItemsToSchema(updatedSchema.properties[alias], data, alias, field)
                }
            }

            setUpdatedSchema({
              ...updatedSchema,
              [alias]: updated[alias]

            }
          );
            return updated
          });
        }

        if(!loaded) {
          setLoaded(true);
          getRecord(table, recordId).then(data => {
            return data
          });

          // ensures we get additional data for loads
          if(requiredData[table] && requiredData[table].length) {
            requiredData[table].map(item => {
              const data = filterTables(item, position);
              if(data[0]) {
                refreshData(data[0]);
              }
              return item
            })
          }
        }

        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <div className="common_Form">
                {loaded && updatedSchema ? <Form
                  schema={updatedSchema}
                  uiSchema={schema.UISchema}
                  formData={formatData(table, record)}
                  onSubmit={(data) => save(data.formData)}>
                </Form> : 'No Form Config'}
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

export default CommonForm;
