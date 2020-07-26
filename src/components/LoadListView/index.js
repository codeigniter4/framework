import React from 'react';
import { Button } from '@material-ui/core';
import { LoadContext } from '../../contexts/LoadContext';
import ListTable from '../ListTable';
import ListToolBar from '../ListToolBar';
import { loadColumns } from './constants/loadColumns';
import { LOAD_MODEL, LOAD_TYPES, LOAD_STATUS } from '../../constants';


const LoadListView = (props) => {

  return (
    <LoadContext.Consumer>{(context) => {
      const { loads, filteredLoads, searchTerm, filterLoads, setLoad, toggleModal } = context;
      const rows = searchTerm ? filteredLoads : loads;
      const editButton = (id) => (<Button color="primary" onClick={() => handleClick(id)}>Edit</Button>);
      const updateRowData = rows.map(row => {
        row.edit = editButton(row.id);
        LOAD_TYPES.map(item => {
          if(row.type === item.type) {
            row.type = item.label
          }
        })
        LOAD_STATUS.map(item => {
          if(row.status === item.type) {
            row.status = item.label
          }
        })

        row.pickupDate = new Date(row.pickupDate).toLocaleString();
        row.dropoffDate = new Date(row.dropoffDate).toLocaleString();
        return row;
      })
      const handleClick = (id) => {
        setLoad(id);
        toggleModal(true);
      }

      const handleChange = (e) => {
        filterLoads(e.target.value)
      }
      return (
        <React.Fragment>
          <ListToolBar handleChange={handleChange}/>
          <ListTable columns={loadColumns} rows={updateRowData}/>
        </React.Fragment>
      )
    }}
    </LoadContext.Consumer>
  )
}

LoadListView.propTypes = {
};

export default (LoadListView);
