import { getInvoiceActions } from './invoice';
import { getLoadsActions } from './loads';
import { getCommonActions } from './common';
import { filterFields } from '../columns/filterFields';

export const getActions = (context, table, history, tableData) => {
  const common = getCommonActions(context, table, history, filterFields, tableData);
  const invoices = getInvoiceActions(context, table, history, filterFields, tableData);
  const loads = getLoadsActions(context, table, history, filterFields, tableData);

  const types = {
    invoices, loads
  }
  return types[table] ? {...common, ...types[table]} : common;
}
