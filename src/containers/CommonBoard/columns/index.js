import { loads } from './loads';
import { brokers } from './brokers';
import { dispatch } from './dispatch';
import { driver } from './driver';
import { equipment } from './equipment';
import { invoices } from './invoices';
import { users } from './users';
import { tractor } from './tractor';
import { trailer } from './trailer';
import { employees } from './employees';


export const getColumnType = (type) => {
  const types = {
    loads, brokers, dispatch, driver, equipment, invoices, users, tractor, trailer, employees
  }
  return types[type] || [];
}
