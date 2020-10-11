import React from 'react';
import Form from '@rjsf/material-ui';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import { paperStyles } from '../../styles/paper';
import { getSchemaType, getFormData } from  './Schemas/';
import { addItemsToSchema } from '../../utils/addItemsToSchema';
import { formatData } from '../../utils/formatData';
import { requiredData } from '../../utils/requiredData';
import { filterTables } from '../../utils/filterTables';
import { getActions } from './actions/'
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
        const { record, getRecord, getAllRecords, setRecord } = context;
        const formData = record['id'] ? record : getFormData(schemaTyle).formData;
        const actions = getActions(context, table, history);

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

        const handleLockToggle = (e) => {
          e.preventDefault();
          setdisabled(!disabled);
          setRecord(table, record);
        }

        const handleBack = (e) => {
          e.preventDefault();
          history.goBack()
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

        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <div className="common_Form">
                <div className="common_Form_Toolbar">
                  {actions && actions.hasToggle ?
                    <Button color="primary" onClick={handleLockToggle}>
                      {disabled ?
                        <LockIcon/> :
                        <LockOpenIcon/>
                      }
                    </Button> :
                  ''}
                  <Button color="primary" onClick={handleBack}>
                    <ArrowBackIcon/>
                  </Button>
                </div>
                {loaded && updatedSchema ? <Form
                  schema={updatedSchema}
                  uiSchema={schema.UISchema}
                  formData={formatData(table, formData)}
                  onSubmit={(data) => actions.handleSave(data.formData)}
                  disabled={disabled}
                  onChange={(data) => actions.handleChange(data.formData, disabled, setdisabled)}>
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
