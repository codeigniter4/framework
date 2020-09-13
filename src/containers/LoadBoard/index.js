import React from 'react';
import LoadListView from '../../components/LoadListView';
import LoadContextProvider from '../../contexts/LoadContext';



function Loadboard(props) {

  return (
    <LoadContextProvider>
      <LoadListView history={props.history}/>
    </LoadContextProvider>
  );
}


export default Loadboard;
