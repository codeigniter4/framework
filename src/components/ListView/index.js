import React from 'react';
import ListTable from '../ListTable';
import ListToolBar from '../ListToolBar';


const ListView = (props) => {
  return (
    <React.Fragment>
      <ListToolBar handleChange={props.actions.handleChange} handleAdd={props.actions.handleAdd}/>
      <ListTable columns={props.columns} rows={props.rows} handleDelete={props.actions.handleDelete}/>
    </React.Fragment>
  )
}

ListView.propTypes = {
};

export default (ListView);
