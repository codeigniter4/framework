import React from 'react';
import PropTypes from 'prop-types';
import BrokerListView from '../../components/BrokerListView';
import BrokerContextProvider from '../../contexts/BrokerContext';



function Brokerboard(props) {

  return (
    <BrokerContextProvider>
      <BrokerListView history={props.history}/>
    </BrokerContextProvider>
  );
}

Brokerboard.propTypes = {};

export default Brokerboard;
