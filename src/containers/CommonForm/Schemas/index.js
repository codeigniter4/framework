import { LoadJSONSchema, LoadUISchema } from './load';
import { BrokerJSONSchema, BrokerUISchema } from './broker';
import { DispatchJSONSchema, DispatchUISchema } from './dispatch';
import { TractorJSONSchema, TractorUISchema } from './tractor';
import { TrailerJSONSchema, TrailerUISchema } from './trailer';
import { DriverJSONSchema, DriverUISchema } from './driver';
import { UsersJSONSchema, UsersUISchema } from './users';


export const getSchemaType = (type) => {
  const types = {
    loads: { JSONSchema: LoadJSONSchema, UISchema:  LoadUISchema},
    brokers: { JSONSchema: BrokerJSONSchema, UISchema:  BrokerUISchema},
    dispatch: { JSONSchema: DispatchJSONSchema, UISchema:  DispatchUISchema},
    tractor: { JSONSchema: TractorJSONSchema, UISchema:  TractorUISchema},
    trailer: { JSONSchema: TrailerJSONSchema, UISchema:  TrailerUISchema},
    driver: { JSONSchema: DriverJSONSchema, UISchema:  DriverUISchema},
    users: { JSONSchema: UsersJSONSchema, UISchema:  UsersUISchema}
  }
  return types[type] || [];
}
