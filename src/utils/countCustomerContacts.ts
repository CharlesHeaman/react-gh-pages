import { ContactResponseData } from "../types/contact.types";

const countCustomerContacts = (contacts: Array<ContactResponseData>, customerID: number): number => {
    return contacts.filter(contact => contact.data.customer_id === customerID).length;
}

export default countCustomerContacts