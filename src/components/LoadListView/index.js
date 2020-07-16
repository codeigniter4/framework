import React from 'react';
import PropTypes from 'prop-types';
import { LoadContext } from '../../contexts/LoadContext';
import ListTable from '../ListTable';
import ListToolBar from '../ListToolBar';
import { loadColumns } from './constants/loadColumns';


const LoadListView = (props) => {

  return (
    <LoadContext.Consumer>{(context) => {
      const { loads } = context;

      return (
        <React.Fragment>
          <ListToolBar/>
          <ListTable columns={loadColumns} rows={loads}/>
        </React.Fragment>
      )
    }}
    </LoadContext.Consumer>
  )
}

LoadListView.propTypes = {
};

export default (LoadListView);
