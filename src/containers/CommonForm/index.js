import React from 'react';
import Form from '@rjsf/material-ui';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import { paperStyles } from '../../styles/paper';
import { getSchemaType, getFormData } from  './Schemas/';
import { addItemsToSchema } from '../../utils/addItemsToSchema';
import { formatData } from '../../utils/formatData';
import { requiredData } from '../../utils/requiredData';
import { filterTables } from '../../utils/filterTables';
import './index.scss';



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
  const [disabled, setdisabled] = React.useState(false);
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const { record, saveRecord, getRecord, getAllRecords, tableData } = context;
        const formData = record['id'] ? record : getFormData(schemaTyle).formData;
        const save = (record) => {
          saveRecord(table, record).then( data => {
            history.goBack();
            return data
          })
        }

        const handleChange = (data) => {
          // console.log(data.formData);


          // if(record.status && record.status !== "Billed" && data.formData.status === "Billed" && !disabled) {
            // const invoiceItems = generateInvoiceItems(load, broker);
            // setdisabled(true);
            // setRecord(load);
            // setinvoices(invoiceItems);
          // }
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
          if(recordId !== 'add') {
            getRecord(table, recordId).then(data => {
              return data
            });
          }


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

        console.log(formData);

        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <div className="common_Form">
                {loaded && updatedSchema ? <Form
                  schema={updatedSchema}
                  uiSchema={schema.UISchema}
                  formData={formatData(table, formData)}
                  onSubmit={(data) => save(data.formData)}
                  disabled={disabled}
                  onChange={handleChange}>
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
