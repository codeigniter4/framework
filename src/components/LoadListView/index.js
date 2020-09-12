import React from 'react';
import { Button } from '@material-ui/core';
import { LoadContext } from '../../contexts/LoadContext';
// import { ModalContext } from '../../contexts/ModalContext';
import ListTable from '../ListTable';
import ListToolBar from '../ListToolBar';
import { loadColumns } from './constants/loadColumns';
import { LOAD_MODEL, LOAD_TYPES, LOAD_STATUS } from '../../constants';


const LoadListView = (props) => {

  return (
    <LoadContext.Consumer>{(context) => {
      const { loads, filteredLoads, searchTerm, filterLoads, setLoad } = context;
      const rows = searchTerm ? filteredLoads : [...loads];
      const handleClick = (id) => {
        console.log(id);
      }
      const editButton = (id) => (
          // <ModalContext.Consumer>{(context) => {
          //   const { toggleModal } = context;
          //   const handleClick = (id) => {
          //     setLoad(id);
          //     toggleModal(true);
          //   }
          //   return (
          //     <Button color="primary" onClick={() => handleClick(id)}>Edit</Button>
          //     )
          //   }
          // }
          // </ModalContext.Consumer>
          <Button color="primary" onClick={() => handleClick(id)}>Edit</Button>
      );
      const updateRowData = rows.map(row => {
        row.edit = editButton(row.id);
        LOAD_TYPES.map(item => {
          if(row.type === item.type) {
            row.type = item.label
          }
          return row
        })
        LOAD_STATUS.map(item => {
          if(row.status === item.type) {
            row.status = item.label
          }
          return row
        })
        row.pickupDate = new Date(row.pickupDate).toLocaleString();
        row.dropoffDate = new Date(row.dropoffDate).toLocaleString();
        return row;
      })

      const handleChange = (e) => {
        filterLoads(e.target.value)
      }
      return (
        <React.Fragment>
          <ListToolBar handleChange={handleChange} newLoad={LOAD_MODEL}/>
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
