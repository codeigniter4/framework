import React, { Component } from 'react';
import Form from '@rjsf/material-ui';
import { JSONSchema } from '../../constants/Schemas/load';

class FormUI extends Component {
  render() {
    return (
      <Form schema={JSONSchema} formData={this.props.formData}></Form>
    );
  }
}

export default FormUI;
