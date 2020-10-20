
import { INVOICE_MODEL } from '../constants';
import { getTodayAndTommorrowDates, addDaysToToday } from './adjustDates'

const getItemAmount = (load, broker, service) => {
  const { rate, detentionPay, lumper, tonu } = load;
  const { quickPayPercentage, detentionRate, tonuFee } = broker;
  switch (service) {
    case 'TONU':
      return parseInt(tonuFee)
      break;
    case 'QUICKPAY':
      const fee = tonu && tonu !== '0' ? tonuFee : rate
      const quickPayFee = fee * quickPayPercentage;
      return -quickPayFee
      break;
    case 'DETENTION':
      const detentionPayFee = detentionPay * detentionRate;
      return detentionPayFee
      break;
    case 'LUMPER CHARGE':
      return lumper;
      break;
    default: return rate
  }
}

const getItem = (load, broker, service) => {
  const { id, loadNumber, dropoffDate, pickupLocation, dropoffLocation} = load;
  const { name, address, Email, paymentTerms} = broker;
  const { today, tomorrow } = getTodayAndTommorrowDates();
  const dueDate = paymentTerms ? addDaysToToday(parseInt(paymentTerms)) : 30;
  const itemAmount = getItemAmount(load, broker, service);
  const description = service === 'Transportation' || service === 'TONU' ? `${pickupLocation} - ${dropoffLocation}` : service;
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
    "ItemDescription": description,
    "ProductService": service, // DETENTION, LUMPER CHARGE, QUICKPAY, TONU
    "ItemQuantity": "1",
    "ItemRate": "",
    "*ItemAmount": itemAmount,
    "billed": '0',
    "brokerid": broker.id
  }

  return itemAmount ? item : false;
}


export const generateInvoiceItems = (load, broker) => {
  const { tonu, detentionPay, layoverPay, lumper } = load;
  const { quickPay } = broker;
  const service = tonu !== "0" && tonu > 0 ? 'TONU' : 'Transportation';
  const invoiceItem = getItem(load, broker, service);
  const quickPayItem = quickPay !== "0" && quickPay > 0 ? getItem(load, broker, 'QUICKPAY') : false;
  const detentionPayItem = detentionPay !== "0" && detentionPay > 0 ? getItem(load, broker, 'DETENTION') : false;
  // const layoverPayItem = layoverPay ? getItem(load, broker, 'LAYOVER') : false;
  const lumperItem = lumper !== "0" && lumper > 0 ? getItem(load, broker, 'LUMPER CHARGE') : false;
  const invoiceItems = [invoiceItem, detentionPayItem, lumperItem, quickPayItem];
  return invoiceItems;
}
