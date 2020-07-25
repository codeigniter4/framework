import React from 'react';
import Button from '@material-ui/core/Button';
import { LoadContext } from '../../contexts/LoadContext';
import ListTable from '../ListTable';
import ListToolBar from '../ListToolBar';
import { loadColumns } from './constants/loadColumns';


const LoadListView = (props) => {

  return (
    <LoadContext.Consumer>{(context) => {
      const { loads, filteredLoads, searchTerm, filterLoads, setLoad, toggleModal } = context;
      const rows = searchTerm ? filteredLoads : loads;
      const editButton = (id) => (<Button color="primary" onClick={() => handleClick(id)}>Edit</Button>);
      const updateRowData = rows.map(row => {
        row.edit = editButton(row.id);
        return row;
      })
      const handleClick = (id) => {
        // setLoadFromList(id)
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
