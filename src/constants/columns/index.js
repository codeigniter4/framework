import { loads } from './loads';
import { brokers } from './brokers';
import { dispatch } from './dispatch';
import { drivers } from './drivers';
import { equipment } from './equipment';
import { invoices } from './invoices';
import { users } from './users';

export const getColumnType = (type) => {
  const types = {
    loads, brokers, dispatch, drivers, equipment, invoices, users
  }
  return types[type] || [];
}
