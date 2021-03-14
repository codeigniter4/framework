import { getInvoiceActions } from './invoice';
import { getLoadsActions } from './loads';
import { getCommonActions } from './common';
import { filterFields } from '../columns/filterFields';

export const getActions = (context, table, db, history) => {
  const common = getCommonActions(context, table, db, history, filterFields);
  const invoices = getInvoiceActions(context, table, history, filterFields);
  const loads = getLoadsActions(context, table, db, history, filterFields);

  const types = {
    invoices, loads
  }
  return types[table] ? {...common, ...types[table]} : common;
}
