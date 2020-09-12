import React from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema } from '../../constants/Schemas/load';
import LoadContextProvider from '../../contexts/LoadContext';
import { LoadContext } from '../../contexts/LoadContext';

function LoadForm(props) {
  return (
    <LoadContextProvider>
      <LoadContext.Consumer>{(context) => {
        const { load, updateLoad, setLoad} = context;
        const loadId = props.match.params.id;

        if(!load.id) {
          setLoad(loadId);
        }

        return (
          <Form schema={JSONSchema} formData={load}></Form>
        )
      }}
      </LoadContext.Consumer>
    </LoadContextProvider>
  )
}

export default LoadForm;
