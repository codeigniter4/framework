
import { INVOICE_MODEL } from '../constants';
import { getTodayAndTommorrowDates, addDaysToToday } from './adjustDates'


const getItem = (load, broker, mainServices) => {
  const { id, loadNumber, dropoffDate, pickupLocation, dropoffLocation} = load;
  const { name, address, Email, paymentTerms} = broker;
  const { today, tomorrow } = getTodayAndTommorrowDates();
  const dueDate = addDaysToToday(parseInt(paymentTerms))
  const item = {
    ...INVOICE_MODEL,
    "*InvoiceNo": `${id}-${loadNumber}`, // 2018 +
    "*Customer": name, // Broker Name
    "BillingAddress": address, // Broker
    "CustomerEmail": Email, // Broker
    "ServiceDate": dropoffDate, // On Drop Load
    "*InvoiceDate": today, // On Completed Load
    "*DueDate": dueDate, // *InvoiceDate + Terms
    "Terms": `NET ${paymentTerms}`, // Broker
    "ItemDescription": `${pickupLocation} - ${dropoffLocation}`, // Load Origin - Destination
    "ProductService": mainServices, // DETENTION, LUMPER CHARGE, QUICKPAY, TONU
    "ItemQuantity": "1",
    "ItemRate": "", // rate - qp fee + detentionPay + layoverPay || TONU charge || lumper
    "*ItemAmount": ""
  }

  return item;
}


export const generateInvoiceItems = (load, broker) => {
  const { tonu } = load;
  const service = tonu !== "0" && tonu > 0 ? 'TONU' : 'TRANSPORTATION';
  const mainServices = ['TRANSPORTATION', 'TONU']
  const additionalServices = ['QUICKPAY', 'DETENTION', 'LUMPER CHARGE'];

  additionalServices.map(service => {

  })



  const invoiceItems = getItem(load, broker, service);
  return [invoiceItems];
}
