import React from 'react';
import ListTable from '../ListTable';
import ListToolBar from '../ListToolBar';


const ListView = (props) => {
  return (
    <React.Fragment>
      <ListToolBar actions={{...props.actions}}/>
      <ListTable {...props}/>
    </React.Fragment>
  )
}

ListView.propTypes = {
};

export default (ListView);
