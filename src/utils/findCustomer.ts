import { CustomerResponseData } from './../types/customers.types';

const findCustomer = (customers: Array<CustomerResponseData>, customerID: number) => {
    return customers.find(customer => customer.id === customerID)
}

export default findCustomer