import React from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema } from '../../constants/Schemas/load';
import LoadContextProvider from '../../contexts/LoadContext';
import { LoadContext } from '../../contexts/LoadContext';
import './index.scss';

function LoadForm(props) {
  const { history, match } = props;
  return (
    <LoadContextProvider>
      <LoadContext.Consumer>{(context) => {
        const { load, save, getLoad} = context;
        const loadId = match.params.id;
        const saveLoad = (load) => {
          save(load).then( data => {
            history.push('/loadboard');
          })
        }

        if(!load.id) {
          getLoad(loadId);
        }

        return (
          <div className="Load_Form">
            <Form schema={JSONSchema} formData={load} onSubmit={(data) => saveLoad(data.formData)}></Form>
          </div>
        )
      }}
      </LoadContext.Consumer>
    </LoadContextProvider>
  )
}

export default LoadForm;
