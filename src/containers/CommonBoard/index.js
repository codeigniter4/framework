import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import TocIcon from '@material-ui/icons/Toc';
import ListView from '../../components/ListView';
import CardView from '../../components/CardView';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import { getColumnType } from './columns';
import { paperStylesTable } from '../../styles/paper';
import { getActions } from './actions';
import { getUpdatedRows } from './rows';
import './index.scss';


function CommonBoard(props) {
  const classes = paperStylesTable();
  const { history, match } = props;
  const [showGrid, setShowGrid] = React.useState(false);
  const position = match.params.position || false;
  const table = match.params.table;
  const tableType = position || table;
  const columnData = getColumnType(tableType);
  const showCard = useMediaQuery('(max-width:1023px)');

  const getListView = (rows, actions) => {
    return (
      <Paper className={classes.paper}>
        <ListView history={history} actions={actions} rows={rows} columns={columnData} order_by="name"/>
      </Paper>
    )
  }

  const getCardView = (rows, actions) => {
    return (
      <CardView history={history} actions={actions} rows={rows} columns={columnData}/>
    )
  }

  const handleLayout = () => {
    setShowGrid(!showGrid)
  }


  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const actions = getActions(context, table, position, history);
        const rows = getUpdatedRows(context, tableType, actions);
        return (
          <Grid container spacing={3}>
            <div className="viewOptions">
                <IconButton onClick={handleLayout}>
                  {!showCard && table === 'loads' ? !showGrid ? <AppsIcon/> : <TocIcon/> : ''}
                </IconButton>
            </div>
            <Grid item xs={12}>
                {showCard && table === 'loads' || !showCard && showGrid && table === 'loads' ? getCardView(rows, actions) : getListView(rows, actions)}
            </Grid>
          </Grid>

        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default CommonBoard;
