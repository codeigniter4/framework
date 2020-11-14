import { getLoadActions } from './load';
import { getBrokerActions } from './broker';
import { getCommonActions } from './common';

export const getActions = (context, table, history) => {
  const common = getCommonActions(context, table, history);

  const types = {
    loads: getLoadActions(context, table, history),
    brokers: getBrokerActions(context, table, history)
  }

  return types[table] ? {...common, ...types[table]} : common;
}
