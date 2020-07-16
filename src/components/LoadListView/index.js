import React from 'react';
import PropTypes from 'prop-types';
import { LoadContext } from '../../contexts/LoadContext';
import ListTable from '../ListTable';
import ListToolBar from '../ListToolBar';
import { loadColumns } from './constants/loadColumns';


const LoadListView = (props) => {

  return (
    <LoadContext.Consumer>{(context) => {
      const { loads, filteredLoads, searchTerm, filterLoads } = context;
      const rows = searchTerm ? filteredLoads : loads;
      const handleChange = (e) => {
        filterLoads(e.target.value)
      }
      return (
        <React.Fragment>
          <ListToolBar handleChange={handleChange}/>
          <ListTable columns={loadColumns} rows={rows}/>
        </React.Fragment>
      )
    }}
    </LoadContext.Consumer>
  )
}

LoadListView.propTypes = {
};

export default (LoadListView);
