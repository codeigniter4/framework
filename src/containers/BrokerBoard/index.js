import React from 'react';
import BrokerListView from '../../components/BrokerListView';
import BrokerContextProvider from '../../contexts/BrokerContext';



function Brokerboard(props) {

  return (
    <BrokerContextProvider>
      <BrokerListView history={props.history}/>
    </BrokerContextProvider>
  );
}


export default Brokerboard;
