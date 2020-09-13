import React, { useState } from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema } from '../../constants/Schemas/load';
import LoadContextProvider from '../../contexts/LoadContext';
import { LoadContext } from '../../contexts/LoadContext';
import './index.scss';
import { get } from '../../services/';

const getAllBrokers = () => {
  const response = get('brokers');
  return response;
}

const addBrokersToSchema = (schema, brokers) => {
  const { broker } = schema.properties;
  broker.enum = []
  broker.enumNames = []

  brokers.map(b => {
    broker.enum.push(b.id);
    broker.enumNames.push(b.name);
  });

  return {...schema,
    properties: {
      ...schema.properties,
      broker: {
        ...broker
      }
    }
  }
}


function LoadForm(props) {
  const { history, match } = props;
  const [brokers, setBrokers] = useState([]);
  return (
    <LoadContextProvider>
      <LoadContext.Consumer>{(context) => {
        const { load, save, getLoad} = context;
        const loadId = match.params.id;
        const saveLoad = (load) => {
          save(load).then( data => {
            history.push('/vgdt-admin/loadboard');
          })
        }

        if(!load.id) {
          getLoad(loadId);
          getAllBrokers().then(data => {
            setBrokers(data)
          })
        }



        return (
          <div className="Load_Form">
            <Form schema={addBrokersToSchema(JSONSchema, brokers)} formData={load} onSubmit={(data) => saveLoad(data.formData)}></Form>
          </div>
        )
      }}
      </LoadContext.Consumer>
    </LoadContextProvider>
  )
}

export default LoadForm;
