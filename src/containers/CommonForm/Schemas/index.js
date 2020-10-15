import { LoadJSONSchema, LoadUISchema, LoadFormData } from './load';
import { BrokerJSONSchema, BrokerUISchema, BrokerFormData } from './broker';
import { DispatchJSONSchema, DispatchUISchema, DispatchFormData } from './dispatch';
import { EquipmentJSONSchema, EquipmentUISchema, EquipmentFormData } from './equipment';
import { DriverJSONSchema, DriverUISchema, DriverFormData } from './driver';
import { UsersJSONSchema, UsersUISchema, UsersFormData } from './users';


export const getSchemaType = (type) => {
  const types = {
    loads: { JSONSchema: LoadJSONSchema, UISchema: LoadUISchema},
    brokers: { JSONSchema: BrokerJSONSchema, UISchema: BrokerUISchema},
    dispatch: { JSONSchema: DispatchJSONSchema, UISchema: DispatchUISchema},
    equipment: { JSONSchema: EquipmentJSONSchema, UISchema: EquipmentUISchema},
    tractor: { JSONSchema: EquipmentJSONSchema, UISchema: EquipmentUISchema},
    trailer: { JSONSchema: EquipmentJSONSchema, UISchema: EquipmentUISchema},
    driver: { JSONSchema: DriverJSONSchema, UISchema: DriverUISchema},
    employees: { JSONSchema: DriverJSONSchema, UISchema: DriverUISchema},
    users: { JSONSchema: UsersJSONSchema, UISchema: UsersUISchema},
  }
  return types[type] || [];
}


export const getFormData = (type) => {
  const types = {
    loads: { formData: LoadFormData },
    brokers: { formData: BrokerFormData },
    dispatch: { formData: DispatchFormData },
    equipment: { formData: EquipmentFormData },
    tractor: { formData: EquipmentFormData },
    trailer: { formData: EquipmentFormData },
    driver: { formData: DriverFormData },
    employees: { formData: DriverFormData },
    users: { formData: UsersFormData },
  }
  return types[type] || [];
}
