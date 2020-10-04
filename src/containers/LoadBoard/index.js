import React from 'react';
import ListView from '../../components/ListView';
import AdminContextProvider from '../../contexts/AdminContext';
import { Button } from '@material-ui/core';
import { AdminContext } from '../../contexts/AdminContext';
import ListTable from '../../components/ListTable';
import ListToolBar from '../../components/ListToolBar';
import { loadColumns } from '../../constants/loadColumns';
import { LOAD_MODEL } from '../../constants';
import { get, getType } from '../../services/';
import { getTodayAndTommorrowDates } from '../../utils/adjustDates'

const getAllBrokers = () => {
  const response = get('brokers');
  return response;
}

const getAllDispatch = () => {
  const response = getType('employees', 'dispatch');
  return response;
}

function Loadboard(props) {
  const table = 'loads';
  const { history } = props;
  const [brokers, setBrokers] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const {records, filteredRecords, searchTerm, filterRecords, getAllRecords, deleteRecord, saveRecord } = context;
        const rows = searchTerm ? filteredRecords : [...records];

        if(!rows.length){
          getAllRecords(table).then(data => {
            return data
          });
          getAllBrokers().then(data => {
            setBrokers(data)
          })
          getAllDispatch().then(data => {
            setUsers(data)
          })
        }
        const actions = {
          handleClick: (id) => {
            history.push(`/vgdt-admin/${table}/${id}`);
          },
          handleChange: (e) => {
            const fields = ['loadNumber', 'user', 'broker'];
            filterRecords(fields, e.target.value)
          },
          handleAdd: () => {
            const updatedLoad = {...LOAD_MODEL};
            const { today, tomorrow } = getTodayAndTommorrowDates();

            updatedLoad.pickupDate = today;
            updatedLoad.dropoffDate = tomorrow;
            saveRecord(table, updatedLoad).then(data => {
              history.push(`/vgdt-admin/${table}/${data.id}`);
            })
          },
          handleDelete: (ids) => {
            deleteRecord(table, ids);
            getAllRecords(table).then(data => {
              return data
            });
          },
          handleExport: false
        }
        const editButton = (id) => (
            <Button color="primary" onClick={() => actions.handleClick(id)}>Details</Button>
        );

        const updateRowData = rows.map(row => {
          const newRow = {...row};
          newRow.edit = editButton(row.id);

          brokers.map(broker => {
            if (broker.id === row.broker) {
              newRow.broker = broker.name
            }
          })

          users.map(user => {
            if (user.id === row.user) {
              newRow.user = user.lastname
            }
          })
          newRow.rate = row.tonu === '1' ? 'TONU' : row.rate;
          newRow.pickupDate = new Date(row.pickupDate).toLocaleString();
          newRow.dropoffDate = new Date(row.dropoffDate).toLocaleString();
          return newRow;
        })
        return (
          <ListView history={history} actions={actions} rows={updateRowData} columns={loadColumns}/>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default Loadboard;
