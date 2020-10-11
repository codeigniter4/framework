import { getInvoiceActions } from './invoice';
import { getCommonActions } from './common';
import { filterFields } from '../columns/filterFields';

export const getActions = (context, table, db, history) => {
  const common = getCommonActions(context, table, db, history, filterFields);
  const invoices = getInvoiceActions(context, table, history, filterFields);

  const types = {
    invoices
  }
  return types[table] || common;
}
