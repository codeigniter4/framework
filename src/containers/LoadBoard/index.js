import React from 'react';
import PropTypes from 'prop-types';
import LoadListView from '../../components/LoadListView';
import LoadContextProvider from '../../contexts/LoadContext';



function Loadboard(props) {

  return (
    <LoadContextProvider>
      <LoadListView history={props.history}/>
    </LoadContextProvider>
  );
}

Loadboard.propTypes = {};

export default Loadboard;
