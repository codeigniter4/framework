import React from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema, UISchema } from '../../constants/Schemas/broker';
import BrokerContextProvider from '../../contexts/BrokerContext';
import { BrokerContext } from '../../contexts/BrokerContext';
import './index.scss';

const formatData = (formData) => {
  const fields_boolean = ['quickPay'];
  const fields_int = [];

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
  const { history, match } = props;
  return (
    <BrokerContextProvider>
      <BrokerContext.Consumer>{(context) => {
        const { broker, save, getBroker} = context;
        const brokerId = match.params.id;
        const savebroker = (broker) => {
          save(broker).then( data => {
            history.push('/vgdt-admin/brokerboard');
            return data
          })
        }

        if(!broker.id) {
          getBroker(brokerId).then(data => {
            return data
          });
        }

        return (
          <div className="broker_Form">
            <Form schema={JSONSchema} uiSchema={UISchema} formData={formatData(broker)} onSubmit={(data) => savebroker(data.formData)}></Form>
          </div>
        )
      }}
      </BrokerContext.Consumer>
    </BrokerContextProvider>
  )
}

export default BrokerForm;
