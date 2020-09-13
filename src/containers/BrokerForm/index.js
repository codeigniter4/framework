import React from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema } from '../../constants/Schemas/broker';
import BrokerContextProvider from '../../contexts/BrokerContext';
import { BrokerContext } from '../../contexts/BrokerContext';
import './index.scss';

function brokerForm(props) {
  const { history, match } = props;
  return (
    <BrokerContextProvider>
      <BrokerContext.Consumer>{(context) => {
        const { broker, save, getBroker} = context;
        const brokerId = match.params.id;
        const savebroker = (broker) => {
          save(broker).then( data => {
            history.push('/brokerboard');
          })
        }

        if(!broker.id) {
          getBroker(brokerId);
        }

        return (
          <div className="broker_Form">
            <Form schema={JSONSchema} formData={broker} onSubmit={(data) => savebroker(data.formData)}></Form>
          </div>
        )
      }}
      </BrokerContext.Consumer>
    </BrokerContextProvider>
  )
}

export default brokerForm;
